# TODO

## Common
- [ ] CRUDRepository
  - [x] createOne handler
  - [ ] createMany handler
  - [x] findOne handler
  - [x] findMany handler
  - [ ] deleteOne handler
  - [ ] deleteMany handler
  - [ ] FindOneAndUpdate handler
  - [ ] Batch FindAndUpdate handler
- [ ] CRUDService
  - [x] createOne handler
  - [ ] createMany handler
  - [x] findOne handler
  - [x] findMany handler
  - [ ] deleteOne handler
  - [ ] deleteMany handler
- [ ] Standards
  - [ ] Enum Error Codes
## Feature
- [ ] User CRUD operations
  - [x] Create User
  - [x] Find one User
  - [x] Find many Users
  - [x] Update User
  - [ ] Delete User

## Tests
### Common
- [ ] ErrorMiddleware
  - [ ] Test log details given valid configuration
### Feature
- [ ] User
  - [ ] RESTful CRUD Unit Tests
    - [x] Create
      - [ ] Valid Create
      - [ ] Invalid Create
    - [x] Read
    - [x] Update
    - [ ] Delete
  - [ ] RESTful CRUD Integration Tests
    - [ ] Create, then read back, then update, then read, then delete
  - [ ] Authentication
    - [ ] RESTful Unit Tests
      - [ ] Create
      - [ ] Validate
    - [ ] RESTful Integration
      - [ ] Create then validate
## CICD
- [ ] Document CICD with Github Actions
- [ ] Find an appropriate deployment target (Digital Ocean, GKE?)
- [ ] 
## Misc
- [ ] Find a better place to handle closing Mongoose connection
- [ ] Remove need for returning server `.close()` handler for `intializeApp()` for test suite
- [ ] Figure out to integrate NextJS with this as the base
- [ ] Investigate Mono-repo-ification 
  - [ ] Lerna