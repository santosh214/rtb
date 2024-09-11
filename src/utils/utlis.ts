export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const getAdmin = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  // Check if the user exists and has the 'admin' role
  const isAdmin = user?.role === 'admin';
  console.log('a', isAdmin);
  return isAdmin ? true : false;
};

export const getUser = () => {
  const storedUser = localStorage.getItem('user');
  console.log("stroe",storedUser)
  const user = storedUser ? JSON.parse(storedUser) : null;
  return user ? true : false;
};
export const getUserData=()=>{
  const storedUser = localStorage.getItem('user');
  const user = storedUser? JSON.parse(storedUser) : null;
  return user;
}
