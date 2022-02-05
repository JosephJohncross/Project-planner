import {ProjectList} from './App/ProjectList.js'

class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectlist = new ProjectList('finished');

    activeProjectList.setSwitchHandlerFunction(
      finishedProjectlist.addProject.bind(finishedProjectlist)
    );
    finishedProjectlist.setSwitchHandlerFunction(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}

App.init();
