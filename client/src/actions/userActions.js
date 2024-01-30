import axios from 'axios'



export const signUp = async (userData) => {
  try {
    const res = await axios.post('/api/v1/signup', userData);
    console.log(res.data)
    return res.data;

  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};


export const signIn = async (userData) => {
    try {
      const res = await axios.post('/api/v1/signin', userData);
      return res.data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };
  