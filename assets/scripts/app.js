//class each project--- EP
//class for each category of project ---CP
//class for all project ---AP

//category of project contains a certain number of projectss
//all project contain two category of project

//When i remove EP from CP, i want to add it it in other CP category
//Since AP contains both CP(2 instances) i'll remove EP from one CP instance and add it to the other CP insatnce

class ProjectItem {
  //   moreInfo = this.project.querySelector("button");

  constructor(projectId) {
    this.projectId = projectId;
    // this.handler = Handler;
    // this.finishOrActivate = document.querySelector(`li[id = ${projectId}] button:last-of-type`);

    // this.eventListeners();
  }
  //   eventListeners() {
  //     this.finishOrActivate.addEventListener("click", this.handler);
  //   }
}

class ProjectCategory extends App{
  projects = [];
  removed = [];

  constructor(projectType) {
    super();
    this.projectType = projectType;
    // this.getListofCurrentProjects();
  }

  removeProject(event,item) {
    let index = this.projects.findIndex((project) => {
      return project.projectId === item.id;
    });
    let removedProject = this.projects.splice(index, 1);
    this.removed.push(removedProject);

    if(event.target.closest('section').id === "active-project"){
      super.removedArray(super.activeProject, super.finishedProject);
    }else if (event.target.closest('section').id === "finished-project"){
      super.removedArray(super.finishedProject, super.activeProject); 

    }


    // console.log(this.removed);
    // console.log(this.projects);
  }

  getListofCurrentProjects() {
    let projectCollection = document.querySelectorAll(
      `#${this.projectType}-projects li`
    );

    for (let item of projectCollection) {
      this.projects.push(new ProjectItem(item.id));
      let lastButton = item.querySelector(`button:last-of-type`);
      lastButton.addEventListener("click", this.removeProject.bind(this,event, item));
    }
    
  }
}

class App {
  // static init() {
    activeProject = new ProjectCategory("active");
    finishedProject = new ProjectCategory("finished");
    
    
    removedArray(deleter, adder) {
      console.log(removedArrayAProject.projectId);
      const removedArrayFProject = deleter.removed.splice(0.1);
      adder.projects.push(removedArrayFProject);
    }
    
  }

let app = new App();
//
