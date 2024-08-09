type User = {
  login: {
    uuid: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  dob: {
    age: number;
    date: string
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    city: string;
    country: string;
    state: string;
    postcode: string;
    street: {
      name: string;
      number: number;
    };
  };
  nat: string;
  phone: string;
  cell: string;
  registered: {
    date: string;
    age: number;
  };
};

type Users = User[];

type Filters = {
  gender: string;
  nationality: string;
  ageMin: string;
  ageMax: string;
};