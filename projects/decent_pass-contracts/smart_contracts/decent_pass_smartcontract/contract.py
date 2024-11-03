from algopy import (
    Account,
    ARC4Contract,
    Box,
    BoxMap,
    BoxRef,
    Global,
    LocalState,
    String,
    Txn,
    UInt64,
    arc4,
    gtxn,
    itxn,
    subroutine,
)

class DecentPassSmartContract(ARC4Contract):
    def __init__(self) -> None:
        # User and validator data
        self.user_profiles = BoxMap(UInt64, String, key_prefix="user_")  # Maps user IDs to profile data
        self.validator_stakes = BoxMap(Account, UInt64, key_prefix="stake_")  # Maps validators to their stakes
        self.verification_status = BoxMap(UInt64, UInt64, key_prefix="verify_")  # Maps user IDs to verification status
        
        # Rewards/Penalties tracking
        self.validator_rewards = BoxMap(Account, UInt64, key_prefix="reward_")  # Maps validators to rewards
        self.validator_penalties = BoxMap(Account, UInt64, key_prefix="penalty_")  # Maps validators to penalties

        # Transaction data for validation
        self.last_verified_profile = Box(UInt64, key="last_profile")  # Tracks last verified profile ID

    @arc4.abimethod
    def register_user(self, user_id: UInt64, profile_data: String) -> None:
        """
        Registers a user profile by storing their user ID and profile data in a BoxMap.
        """
        self.user_profiles[user_id] = profile_data
        self.verification_status[user_id] = UInt64(0)  # 0 means unverified

    @arc4.abimethod
    def assign_validator(self, validator: Account, stake_amount: UInt64) -> None:
        """
        Allows a validator to stake tokens and participate in the verification process.
        """
        assert stake_amount >= UInt64(1000), "Minimum stake of 1000 tokens required"
        self.validator_stakes[validator] = stake_amount

    @arc4.abimethod
    def verify_user(self, user_id: UInt64, validator: Account) -> None:
        """
        Allows a validator to verify a user profile. Increases the validator's rewards or penalties
        based on the accuracy of verification, to be handled later.
        """
        assert self.user_profiles[user_id], "User profile not found"
        assert self.validator_stakes[validator] >= UInt64(1000), "Validator stake too low"

        # Mark user as verified
        self.verification_status[user_id] = UInt64(1)
        
        # Update last verified profile
        self.last_verified_profile.value = user_id

        # Reward validator for successful verification
        self.adjust_validator_reward(validator, UInt64(100))  # Base reward of 100 tokens

    @arc4.abimethod
    def claim_stake(self, validator: Account) -> None:
        """
        Allows a validator to claim their stake along with accumulated rewards minus penalties.
        """
        stake_amount = self.validator_stakes.get(validator, default=UInt64(0))
        rewards = self.validator_rewards.get(validator, default=UInt64(0))
        penalties = self.validator_penalties.get(validator, default=UInt64(0))

        claimable_amount = stake_amount + rewards - penalties
        assert claimable_amount > 0, "No claimable amount available"

        # Execute payment to validator
        itxn.Payment(
            receiver=validator,
            amount=claimable_amount
        ).submit()

        # Reset validator's stake, rewards, and penalties
        del self.validator_stakes[validator]
        del self.validator_rewards[validator]
        del self.validator_penalties[validator]

    @arc4.abimethod
    def retrieve_profile(self, user_id: UInt64) -> String:
        """
        Returns the profile data for a given user ID, allowing validators to view profiles.
        """
        return self.user_profiles.get(user_id, default=String("Profile not found"))

    @arc4.abimethod
    def penalty_validator(self, validator: Account, penalty_amount: UInt64) -> None:
        """
        Imposes a penalty on a validator for inaccurate verification.
        """
        current_penalty = self.validator_penalties.get(validator, default=UInt64(0))
        self.validator_penalties[validator] = current_penalty + penalty_amount

    @arc4.abimethod
    def adjust_validator_reward(self, validator: Account, reward_amount: UInt64) -> None:
        """
        Increases a validator's reward by the specified reward amount.
        """
        current_reward = self.validator_rewards.get(validator, default=UInt64(0))
        self.validator_rewards[validator] = current_reward + reward_amount

    @subroutine
    def reset_verification(self, user_id: UInt64) -> None:
        """
        Helper subroutine to reset a user's verification status, used when re-verification is required.
        """
        self.verification_status[user_id] = UInt64(0)

    @subroutine
    def retrieve_last_verified_profile(self) -> UInt64:
        """
        Retrieves the ID of the last profile that was verified.
        """
        return self.last_verified_profile.value

