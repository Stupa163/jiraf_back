# Unprotected routes :
**POST** : `/register`
  > Add a user\
  > Return : `{{User}, {Company}, token}`

    Parameters : {
        firstName: String
        lastName: String
        mail: String
        plainPassword: String
        phone: Int
        profile: Enum('back', 'front', 'data_analyst', 'qa')
        companyName: String
        companySiret: Int
        companyStatus: Enum('sas', 'sasu', 'autoentrepreneur', 'eurl', 'sarl')
    }

\
**POST** : `/login`
  > Return\
  > Return : `{{User}, token}`

    Parameters : {
        pseudo: String
        plainPassword: String
    }
    
**POST** : `/token`
  > Return a refreshed token\
  > Return : `token`

    Parameters : {
        token: the expired token
    }
    
# User's routes :

##Payment
**POST** : `/payment`
  > Charge 450€ of the given credit card\
  > This payment allow the connected user to access the rest of the app\
  > Return : amount : The charged amount (in cent)\
  > **NB** : Stripe token are used in a test context, the charge won't be billed for real\
  > Plus, you can use `4242 4242 4242 4242` as card number in order to test the endpoint

##User :
**GET** : `/user/metrics`
  > Return the connected user's metrics\
  > Return : 

    {
        projectCount
        onGoingProjectsCount
        turnover
        averageHourlyRate
    }

## Clients :
**GET** : `/client/:id`
  > Return the client with the given id\
  > Return : `{Client}`


**GET** : `/client/all`
  > Return all the clients\
  > Return `[{Client}]`


**POST** : `/client`
  > Create a client\
  > Return : `{Client}`

    Parameters : {
        name : String
        address: String
        contactFirstName: String
        contactLastName: String
        phone: Int
        mail: String
    }

**PATCH** : `/client/:id`
  > Amend a client\
  > Return : `{Client}`

    Possible parameters : {
        name : String
        address: String
        contactFirstName: String
        contactLastName: String
        phone: Int
        mail: String
    }
    
**DELETE** : `/client/:id`
  > Delete a client\
  > Return : `result: 'deleted'`


## Projects :
**GET** : `/project/`
  > Return all the projects of the logged user\
  > Return : `[{Project}]`\
  > **NB** : Projects objects include linked Sprint\
  > **NB** : Sprints objects include linked Tasks


**GET** : `/project/:id`
  > Return the project with the given id if it belongs to the logged user\
  > Return : `{Project}`\
  > **NB** : Project objects include linked Sprint\
  > **NB** : Sprints objects include linked Tasks

**GET** : `/project/difference/:id`
  > Return the sum of hour spent on the project and the gap between the estimate cost and the real cost for the given project\
  > Return : `hoursSpent, gapCost`

**POST** : `/project`
  > Create a project\
  > Return : `{Project}`

    Parameters : {
        title : String
        amount: Float
        delay: Int
        startDate: Date ('mm/dd/yyyy' / 'mm-dd-yyyy')
        endDate: Date ('mm/dd/yyyy' / 'mm-dd-yyyy')
        status: Enum('en_cours', 'realise')
        stacks: String
        adr: Int
        client: String => The client's mail
        githubRepository (optional): String
    }

**POST** : `/project/createFromRepository`
  > Create a project from the given github repository if this one has a correct markdown\
  > Return `{Project}`

    Parameters : {
        pseudo: String => The user's github pseudo
        password: String => The user's github password
        repoName: The name of the github repository
    }


**PATCH** : `/project/:id`
  > Amend a project\
  > Return : `{Project}`

    Possible parameters : {
        title : String
        amount: Float
        delay: Int
        startDate: Date ('mm/dd/yyyy' / 'mm-dd-yyyy')
        endDate: Date ('mm/dd/yyyy' / 'mm-dd-yyyy')
        status: Enum('en_cours', 'realise')
        stacks: String
        adr: Int
        githubRepository: String
    }
    
**DELETE** : `/project/:id`
  > Delete a project\
  > Return : `result: 'deleted'`


## Sprints :
**GET** : `/sprint/`
  > Return all the sprints of the logged user\
  > Return : `[{Sprint}]`\
  > **NB** : Sprints objects include linked Project\
  > **NB** : Sprints objects include linked Tasks


**GET** : `/sprint/:id`
  > Return the sprint with the given id if it belongs to a project which belongs to the logged user\
  > Return : `{Sprint}`\
  > **NB** : Sprint objects include linked Projects\
  > **NB** : Sprint objects include linked Tasks

**POST** : `/sprint`
  > Create a sprint\
  > Return : `{Sprint}`

    Parameters : {
        title : String
        startDate: Date ('mm/dd/yyyy' / 'mm-dd-yyyy')
        endDate: Date ('mm/dd/yyyy' / 'mm-dd-yyyy')
        status: Enum('en_cours', 'termine', 'a_faire')
        project: Int => The project's id
    }

**PATCH** : `/sprint/:id`
  > Amend a sprint\
  > Return : `{Sprint}`

    Possible parameters : {
        title : String
        startDate: Date ('mm/dd/yyyy' / 'mm-dd-yyyy')
        endDate: Date ('mm/dd/yyyy' / 'mm-dd-yyyy')
        status: Enum('en_cours', 'termine', 'a_faire')
        project: Int => The project's id
    }
    
**DELETE** : `/sprint/:id`
  > Delete a sprint\
  > Return : `result: 'deleted'`


## Tasks :
**GET** : `/task/`
  > Return all the tasks of the logged user\
  > Return : `[{Task}]`\
  > **NB** : Tasks objects include linked Sprints\
  > **NB** : Sprints objects include linked Projects


**GET** : `/tasks/:id`
  > Return the task with the given id if it belongs to a sprint which belongs to a project which belongs to the logged user\
  > Return : `{Task}`\
  > **NB** : Tasks objects include linked Sprints\
  > **NB** : Sprints objects include linked Projects

**POST** : `/task`
  > Create a task\
  > Return : `{Task}`

    Parameters : {
        title : String
        description : String
        status: Enum('en_cours', 'termine', 'a_faire')
        completionTime: Int
        sprint: Int => The sprint's id
    }

**PATCH** : `/task/:id`
  > Amend a task\
  > Return : `{Task}`

    Possible parameters : {
        title : String
        description : String
        status: Enum('en_cours', 'termine', 'a_faire')
        completionTime: Int
        sprint: Int => The sprint's id
    }
    
**DELETE** : `/task/:id`
  > Delete a task\
  > Return : `result: 'deleted'`


## Issues :
**GET** : `/issue/:projectid`
  > Get all the issue of the given project\
  > **NB** : The githubRepository fields of the project needs to be filled in order to create the issue\
  > Return : `[{Issues}]`

**POST** : `/issue/:projectId`
  > Create a github issue for the given project\
  > **NB** : The githubRepository fields of the project needs to be filled in order to create the issue\
  > Return : `url: issue's url`

    Parameters : {
        pseudo: String => The user's github pseudo
        password: String => The user's github password
        title: String => The issue's title
        body: String => The isssue's description
        tags: String => The tags for the issue (separated by a comma ',')
    }
