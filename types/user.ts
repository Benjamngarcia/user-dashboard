type User = {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  dob: {
    age: number;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    city: string;
    country: string;
  };
  nat: string;
};

type Users = User[];
