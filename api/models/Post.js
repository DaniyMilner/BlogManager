module.exports = {
  attributes: {
    owner:{
      model:'user'
    },
    text:{
      type: 'string',
      unique: false,
      required: true
    }
  }
};
