import Noty from 'noty';

export default class NotificationsService {

  success(message) {
    (new Noty({
      text: message,
      type: "success",
      layout: "topRight",
      theme: "relax",
      timeout: 2000
    })).show()
  };

  error(message) {
    (new Noty({
      text: message,
      type: "error",
      layout: "bottomRight",
      theme: "sunset",
      timeout: 2000
    })).show()
  };

  alert(message) {
    (new Noty({
      text: message,
      type: "warning",
      timeout: 2000
    })).show()
  };

};
