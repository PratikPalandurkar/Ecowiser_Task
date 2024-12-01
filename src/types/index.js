// User object structure
const User = {
  id: '',         // string
  email: '',      // string
  name: '',       // string
};

// Brand object structure
const Brand = {
  id: '',         // string
  name: '',       // string
  description: '',// string
  logo: '',       // string
  userId: '',     // string (refers to the User)
  createdAt: '',  // string (ISO 8601 date format)
};

// Product object structure
const Product = {
  id: '',         // string
  name: '',       // string
  description: '',// string
  category: '',   // string
  price: 0,       // number
  imageUrl: '',   // string
  brandId: '',    // string (refers to the Brand)
  userId: '',     // string (refers to the User)
  createdAt: '',  // string (ISO 8601 date format)
};
