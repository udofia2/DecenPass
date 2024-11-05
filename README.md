# decent_pass

This decentralized identity solution is designed to address identity verification challenges in Nigeria, especially in rural and underserved areas. Built on the `Algorand blockchain` using `Algokit` and `Algopy`, this system introduces a decentralized approach to identity verification where validators—who are individuals or organizations with full Know Your Customer (KYC) credentials (such as BVN or NIN)—validate the identities of individuals who may not have access to traditional identification systems.

## Setup

### Initial setup
1. Clone this repository to your local machine.
```bash
$ git clone https://github.com/udofia2/DecentPass.git
```

2. Ensure [Docker](https://www.docker.com/) is installed and operational. Then, install `AlgoKit` following this [guide](https://github.com/algorandfoundation/algokit-cli#install).

3. Run `algokit project bootstrap all` in the project directory. This command sets up your environment by installing necessary dependencies, setting up a Python virtual environment, and preparing your `.env` file.
4. In the case of a smart contract project, execute `algokit generate env-file -a target_network localnet` from the `decent_pass-contracts` directory to create a `.env.localnet` file with default configuration for `localnet`.
5. To build your project, execute `algokit project run build`. This compiles your project and prepares it for running.
6. For project-specific instructions, refer to the READMEs of the child projects:
   - Smart Contracts: [decent_pass-contracts](projects/decent_pass-contracts/README.md)
   - Frontend Application: [decent_pass-frontend](projects/decent_pass-frontend/README.md)

> This project is structured as a monorepo, refer to the [documentation](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/project/run.md) to learn more about custom command orchestration via `algokit project run`.

### Subsequently

1. If you update to the latest source code and there are new dependencies, you will need to run `algokit project bootstrap all` again.
2. Follow step 3 above.

## Tools

This project makes use of Python and React to build Algorand smart contracts and to provide a base project configuration to develop frontends for Algorand dApps and interactions with smart contracts. The following tools are in use:

- Algorand, AlgoKit, and AlgoKit Utils
- Python dependencies including Poetry, Black, Ruff or Flake8, mypy, pytest, and pip-audit
- React and related dependencies including AlgoKit Utils, Tailwind CSS, daisyUI, use-wallet, npm, jest, playwright, Prettier, ESLint, and Github Actions workflows for build validation



## Integrating with smart contracts and application clients

Refer to the [decent_pass-contracts](projects/decent_pass-contracts/README.md) folder for overview of working with smart contracts, [projects/decent_pass-frontend](projects/decent_pass-frontend/README.md) for overview of the React project and the [projects/decent_pass-frontend/contracts](projects/decent_pass-frontend/src/contracts/README.md) folder for README on adding new smart contracts from backend as application clients on your frontend. The templates provided in these folders will help you get started.

