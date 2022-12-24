export const Routes = {
  REGISTER: '/register',
  ROOT: '/',
  LOGIN: '/login',
  CREATE: '/create',
  INFO: '/info/:id',
  USERS: '/users',
  PROFILE: '/profile',
  UPDATE_CURRENT_USER_PROFILE: '/profile/update',
  UPDATE_USER_PROFILE: '/profile/update/:id',
  MULTI_STEP_FORM: '/multi-step-form',
}

export const Api = {
  USER: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOAD_USER: '/user',
    GET_ALL_USERS: '/users',
    GET_USER: (id) => `/users/${id}`,
    UPDATE_USER: (id) => `/users/${id}`,
    UPDATE_USER_AVATAR: (id) => `/users/${id}/avatar`,
    GET_USER_LANGUAGES: (id) => `/users/${id}/languages`,
    ADD_USER_LANGUAGE: (id) => `/users/${id}/languages`,
    UPDATE_USER_LANGUAGE: ({ userId, languageCode }) =>
      `/users/${userId}/languages/${languageCode}`,
    DELETE_USER_LANGUAGE: ({ userId, languageCode }) =>
      `/users/${userId}/languages/${languageCode}`,
  },
  POSTS: {
    CREATE: '/posts',
    GET_ALL_POSTS: '/posts',
    GET_POST: (id) => `/posts/${id}`,
    EDIT_POST: (id) => `/posts/${id}`,
    DELETE_POST: (id) => `/posts/${id}`,
    LIKE_POST: (id) => `/posts/${id}/like`,
  },
  EDUCATION: {
    CREATE: (userId) => `/users/${userId}/educations`,
    GET_ALL_EDUCATIONS: (userId) => `/users/${userId}/educations`,
    UPDATE_EDUCATION: ({ userId, educationId }) => `/users/${userId}/educations/${educationId}`,
    DELETE_EDUCATION: ({ userId, educationId }) => `/users/${userId}/educations/${educationId}`,
  },
  EXPERIENCE: {
    CREATE: (userId) => `/users/${userId}/experiences`,
    GET_ALL_EXPERIENCES: (userId) => `/users/${userId}/experiences`,
    UPDATE_EXPERIENCE: ({ userId, experienceId }) => `/users/${userId}/experiences/${experienceId}`,
    DELETE_EXPERIENCE: ({ userId, experienceId }) => `/users/${userId}/experiences/${experienceId}`,
  },
  LANGUAGE: {
    CREATE: '/languages',
    GET_ALL_LANGUAGES: '/languages',
    UPDATE_LANGUAGE: (languageId) => `/languages/${languageId}`,
    DELETE_LANGUAGE: (languageId) => `/languages/${languageId}`,
  },
}

export const Roles = {
  user: 'user',
  admin: 'admin',
}

export const FormsValidation = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
}

export const ApiTokenStorageKey = 'userToken'

export const dateFormat = 'yyyy-MM-dd'
