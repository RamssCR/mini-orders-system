# Mini Orders System Architecture

A distributed, high-performance microservices workspace built with NestJS, TypeORM (PostgreSQL), and Mongoose (MongoDB).
This system processes user orders through an API Gateway, enforces safe relational checkouts, and pipes decoupled audit
history state changes down to a NoSQL storage cluster over highly optimized TCP communication channels.

## System Architecture
The ecosystem relies on an Edge Gateway pattern backed by isolated domain microservices:

* **`app-gateway`**: Public entry point (HTTP). Responsible for input sanitization, edge validation via global pipes, and proxying incoming actions downstream.
* **`orders-service`**: Core domain engine. Implements transaction tracking with pessimistic concurrency row locks to prevent stock race conditions and manages the relational state machine.
* **`audit-service`**: TCP microservice resposible for auditing orders status changes, using MongoDB to persist all recorded snapshots.

## Prerequisites

Ensure you have the following components running locally:
* Node.js (v20 or higher recommended)
* Docker (to spin up both databases and brokers instances)

## Installation & Setup
1. Clone the repository and navigate to the project directory root.
2. Install the workspace and internal processes dependencies.

```BASH
# Global workspace
npm install

cd app-gateway
npm install

cd audit-service
npm install

cd orders-service
npm install
```

3. Set up environment variables for each individual module. Copy the `.env.example` blueprints in each subfolder into localized `.env` profiles.
4. Inside the orders service, run the migrations to populate the products table. (important to perform order creation)

```BASH
cd orders-service
npm run migration:run
```

5. Run the proyect.
```BASH
# Starts the Audit log collector (TCP Server / MongoDB Client)
npm --prefix audit-service run start:dev

# Starts the Orders processing engine (RabbitMQ Server / Postgres Client)
npm --prefix orders-service run start:dev

# Starts the public API Gateway (HTTP Entrypoint / TCP/RabbitMQ Client)
npm --prefix app-gateway run start:dev
```

## Additional Scripts
The workspace includes centralized scripts that can evaluate code linting, run test files and preparing husky
for pre-commit and commitlint usage.

```BASH
# Inside the workspace directory

# Reports linting errors from all subdirectories
npm run lint

# Runs all test files
npm test

# Generate a coverage report
npm run test:cov
```

> [!NOTE]
> Alternatively, you can also run these scripts inside every project.

## `lint-staged`
For every changed made, once the developer commits them, an intermediary process will run to:
- Format code (Prettier)
- Verify linting errors (ESLint)
- Run test files related to the changed files (Jest)

If all processes are executed successfully, commitlint will also evaluate the commit message follows a standard format:

```BASH
git commit -m "subject: message starting in lower case and less than 100 characters"
```

If the message matches the standard format, the commit is successfully created and ready to be pushed.

## Technical Decisions for this project

### Why did you use RabbitMQ for the orders service?
- **Service Decoupling**: The `orders-service` should never care whether an audit log succeeds, fails, or if the `audit-service` is completely offline during a checkout. By publishing an asynchronous event to a RabbitMQ broker, the order processing pipeline remains unblocked and blazingly fast.
- **Message Prioritization & Guarding**: By funneling synchronous commands through RabbitMQ queues, the system gains native traffic-shaping capabilities. If the database hits maximum connection limits, requests are safely managed by the queue channels rather than dropping raw socket connections or throwing unhandled connection timeout errors at the gateway layer.

### Why did you go for a TCP channel instead of a NestJS `EventEmitter` service?
Since we're going for a microservice approach, our `audit-service` is beneficiated to handle the audit log creation using
the `@EventPattern` channel stream, keeping the audit business logic and future endpoint implementations altogether, instead of
setting up and independent event emitter.

### Why are more entities in the orders service instead of just the order entity mentioned in the technical test requirements?
To avoid the standard data-mutation anti-pattern common in basic CRUD systems, the architecture splits order processing into
three different tables: `User`, `Order`, `User`, and `OrderItem`.

- **The Historical Snapshot Protection**: If an `Order` pointed directly to a `Product` in a standard many-to-many join table, any future price adjustments or name edits in the product catalog would retroactively alter past financial order metrics.
- **The Intermediary Junction Ledger (`OrderItem`)**: Introducing an explicit `OrderItem` entity allows us to freeze the exact point-in-time state of the purchase. It stores the specific quantity ordered by the user at that precise millisecond, preserving complete financial auditing integrity.
- **Concurrency Protection**: Isolating these entities allowed us to securely implement `pessimistic_write` row-level locks on the specific database rows during checkout, safely scaling the application under high concurrent traffic without inventory race conditions.

### Why did you use `lint-staged` in a personal project
- **Pre-Commit Code Quality Assurance**: It is incredibly easy to accidentally commit console logs, commented-out dead code, or minor syntax formatting errors when working quickly. Implementing `lint-staged` forces the workspace to run strict ESLint analysis and prettier formatting checks before a commit is officially written to the git history.
- **Automated CI Simulation**: By enforcing code quality guardrails locally at the commit level, it guarantees that any code pushed to a remote repository is already compliant with the workspace's structural rules. This prevents the common, messy anti-pattern of pushing broken code to a remote branch, waiting for a GitHub Actions pipeline to fail, and making multiple "fix lint" typo commits to patch it.