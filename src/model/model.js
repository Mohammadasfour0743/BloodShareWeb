import { saveRequests } from './firebaseModel';

const model = {
  ready: false,
  id: undefined,
  username: undefined,
  location: undefined,
  name: undefined,
  email: undefined,
  phone: undefined,
  longitude: undefined,
  latitude: undefined,
  coordinates: undefined,

  requests: [],
  responses: {},

  setEmail(email) {
    this.email = email;
  },
  setPhone(phone) {
    this.phone = phone;
  },
  setId(id) {
    this.id = id;
  },

  setUsername(username) {
    this.username = username;
  },

  setPassword(password) {
    this.password = password;
  },

  setLocation(location) {
    this.location = location;
  },
  setName(name) {
    this.name = name;
  },
  addRequest(request) {
    this.requests = [request, ...this.requests];
    saveRequests(request);
  },
  removeRequest(id) {
    this.requests = this.requests.filter((request) => {
      return request.id !== id;
    });
  },
  deactivateRequest(id) {
    this.requests = this.requests.map((request) => {
      if (request.id === id) {
        return {
          ...request,
          current: false,
        };
      } else {
        return request;
      }
    });
  },
  setRequests(requests) {
    this.requests = requests;
  },
  setResponses(responses) {
    responses.forEach((response) => {
      const oldResponses = this.getResponses(response.requestId) ?? [];
      const newResponses = [...oldResponses, response];

      this.responses = {
        ...this.responses,
        [response.requestId]: newResponses,
      };
    });
  },
  getResponses(requestId) {
    return this.responses[requestId] ?? [];
  },
  addResponse(response) {
    const reqId = response.requestId;
    const oldResponses = this.getResponses(reqId) ?? [];
    const newResponses = [...oldResponses, response];
    this.responses = {
      ...this.responses,
      [reqId]: newResponses,
    };
  },
  setlongitude(longitude) {
    this.longitude = longitude;
  },
  setLatitude(latitude) {
    this.latitude = latitude;
  },
  clearRequests() {
    this.requests = [];
  },
  clearModel() {
    this.ready = false;
    this.id = undefined;
    this.username = undefined;
    this.location = undefined;
    this.name = undefined;
    this.email = undefined;
    this.phone = undefined;
    this.longitude = undefined;
    this.latitude = undefined;
    this.coordinates = undefined;
    this.requests = [];
    this.response = [];
    this.ready = true;
  },
};

export { model };

/*
request: {
    id: string;
    hospitalId: string;
    urgency: number;
    bloodType: string;
    amount: number;
    description: string;
}

hospital: {
    id: string
    name: string
    location: string
    contact: {
        email: string
        phone: string
    }
}
*/
