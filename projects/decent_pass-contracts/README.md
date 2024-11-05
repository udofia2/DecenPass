# decent_pass-contracts

The DecentPass smart contract is designed to facilitate user profile verification in a decentralized manner using validators. Validators can stake tokens to participate in the verification process, and once a user has enough validator confirmations, their profile is considered verified.


## Smart Contract Functions

- register_user(user_id: UInt64, profile_data: String)

   - Registers a user with a unique user_id, name, age, and address.
   - Sets the initial verification status to unverified (0).

   Example:
   ```python
   decent_pass_smartcontract.register_user(1, "John Doe", UInt64(30), "123 Main St, Springfield")


- assign_validator(validator: Account, stake_amount: UInt64)

    Allows a validator to stake tokens (minimum of 1000 tokens) to participate in the verification process.

   Example: 
   ```python

   decent_pass_smartcontract.assign_validator(validator_account, UInt64(5000))

- verify_user(user_id: UInt64, validator: Account)

    Validators use this method to verify user profiles.
    It requires confirmations from at least required_validators validators before marking a user as verified.

   Example:
   ```python
   
   decent_pass_smartcontract.verify_user(1, validator_account)

- claim_stake(validator: Account)

    Validators can claim their staked amount along with any rewards minus penalties.

   Example:
   ```python
   
   decent_pass_smartcontract.claim_stake(validator_account)

- retrieve_profile(user_id: UInt64) -> String

    Allows validators to retrieve the profile data of a user based on their user_id.

   Example:
   ```bash

   decent_pass_smartcontract.retrieve_profile(1)

- penalty_validator(validator: Account, penalty_amount: UInt64)

    Penalizes a validator for inaccurate verification.

   Example:
   ```python

   decent_pass_smartcontract.penalty_validator(validator_account, UInt64(100))

- adjust_validator_reward(validator: Account, reward_amount: UInt64)

    Increases the validator’s reward for successfully verifying a user.

   Example:
   ```python

      decent_pass_smartcontract.adjust_validator_reward(validator_account, UInt64(200))


- reset_verification(user_id: UInt64)

    Helper method used to reset a user’s verification status if re-verification is required.

   Example:

   ```python

   decent_pass_smartcontract.reset_verification(1)

- retrieve_last_verified_profile() -> UInt64

    Retrieves the user_id of the last verified profile.

   Example:

   ```python
      decent_pass_smartcontract.retrieve_last_verified_profile()



# Setup

### Pre-requisites

- [Python 3.12](https://www.python.org/downloads/) or later
- [Docker](https://www.docker.com/) (only required for LocalNet)

> For interactive tour over the codebase, download [vsls-contrib.codetour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour) extension for VS Code, then open the [`.codetour.json`](./.tours/getting-started-with-your-algokit-project.tour) file in code tour extension.

### Initial Setup

#### 1. Clone the Repository
Start by cloning this repository to your local machine.
```bash
$ git clone https://github.com/udofia2/DecentPass.git
```

#### 2. Install Pre-requisites
Ensure the following pre-requisites are installed and properly configured:

- **Docker**: Required for running a local Algorand network. [Install Docker](https://www.docker.com/).
- **AlgoKit CLI**: Essential for project setup and operations. Install the latest version from [AlgoKit CLI Installation Guide](https://github.com/algorandfoundation/algokit-cli#install). Verify installation with `algokit --version`, expecting `2.0.0` or later.

#### 3. Bootstrap Your Local Environment
Run the following commands within the project folder:

- **Install Poetry**: Required for Python dependency management. [Installation Guide](https://python-poetry.org/docs/#installation). Verify with `poetry -V` to see version `1.2`+.
- **Setup Project**: Execute `algokit project bootstrap all` to install dependencies and setup a Python virtual environment in `.venv`.
- **Configure environment**: Execute `algokit generate env-file -a target_network localnet` to create a `.env.localnet` file with default configuration for `localnet`.
- **Start LocalNet**: Use `algokit localnet start` to initiate a local Algorand network.

### Development Workflow

#### Terminal
Directly manage and interact with your project using AlgoKit commands:

1. **Build Contracts**: `algokit project run build` compiles all smart contracts. You can also specify a specific contract by passing the name of the contract folder as an extra argument.
For example: `algokit project run build -- hello_world` will only build the `hello_world` contract.

2. **Deploy**: Use `algokit project deploy localnet` to deploy contracts to the local network. You can also specify a specific contract by passing the name of the contract folder as an extra argument.
For example: `algokit project deploy localnet -- decent_pass_smartcontract` will only deploy the `decent_pass_smartcontract` contract.

