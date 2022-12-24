import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { generateApiPath } from '../utils/generateApiPath'
import { Api } from '../constans'

export const servers = {
  contactInformationForm: ({ mockedUser, requestFunc }) =>
    setupServer(
      rest.get(generateApiPath(Api.USER.LOAD_USER), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { user: mockedUser },
          }),
        )
      }),
      rest.put(generateApiPath(Api.USER.UPDATE_USER(mockedUser.id)), async (req, res, ctx) => {
        const body = await req.json()
        requestFunc(body)
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
          }),
        )
      }),
    ),
  educationInformationForm: ({ mockedUser, mockedEducations, requestFunc }) =>
    setupServer(
      rest.get(generateApiPath(Api.USER.LOAD_USER), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { user: mockedUser },
          }),
        )
      }),
      rest.get(
        generateApiPath(Api.EDUCATION.GET_ALL_EDUCATIONS(mockedUser.id)),
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              data: { educations: mockedEducations },
            }),
          )
        },
      ),
      rest.put(
        generateApiPath(Api.EDUCATION.UPDATE_EDUCATION({ userId: mockedUser.id, educationId: 2 })),
        async (req, res, ctx) => {
          const body = await req.json()
          requestFunc(body)
          return res(
            ctx.status(200),
            ctx.json({
              success: true,
            }),
          )
        },
      ),
      rest.delete(
        generateApiPath(Api.EDUCATION.DELETE_EDUCATION({ userId: mockedUser.id, educationId: 2 })),
        async (req, res, ctx) => {
          requestFunc()
          return res(
            ctx.status(200),
            ctx.json({
              success: true,
            }),
          )
        },
      ),
      rest.post(generateApiPath(Api.EDUCATION.CREATE(mockedUser.id)), async (req, res, ctx) => {
        const body = await req.json()
        requestFunc(body)
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
          }),
        )
      }),
    ),
  languagesForm: ({
    mockedUser,
    mockedLanguages,
    mockedUserLanguages,
    putRequestFunc,
    postRequestFunc,
  }) =>
    setupServer(
      rest.get(generateApiPath(Api.USER.LOAD_USER), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { user: mockedUser },
          }),
        )
      }),
      rest.get(generateApiPath(Api.LANGUAGE.GET_ALL_LANGUAGES), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { languages: mockedLanguages },
          }),
        )
      }),
      rest.get(generateApiPath(Api.USER.GET_USER_LANGUAGES(mockedUser.id)), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { languages: mockedUserLanguages },
          }),
        )
      }),
      rest.put(
        generateApiPath(
          Api.USER.UPDATE_USER_LANGUAGE({ userId: mockedUser.id, languageCode: 'en' }),
        ),
        async (req, res, ctx) => {
          const body = await req.json()
          putRequestFunc({ level: body.level })
          return res(
            ctx.status(200),
            ctx.json({
              success: true,
            }),
          )
        },
      ),
      rest.post(
        generateApiPath(Api.USER.ADD_USER_LANGUAGE(mockedUser.id)),
        async (req, res, ctx) => {
          const body = await req.json()
          postRequestFunc({
            code: body.code,
            level: body.level,
          })
          return res(
            ctx.status(200),
            ctx.json({
              success: true,
            }),
          )
        },
      ),
    ),
  workExperienceForm: ({ mockedUser, mockedWorkExperiences, requestFunc }) =>
    setupServer(
      rest.get(generateApiPath(Api.USER.LOAD_USER), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { user: mockedUser },
          }),
        )
      }),
      rest.get(
        generateApiPath(Api.EXPERIENCE.GET_ALL_EXPERIENCES(mockedUser.id)),
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              data: { experiences: mockedWorkExperiences },
            }),
          )
        },
      ),
      rest.put(
        generateApiPath(
          Api.EXPERIENCE.UPDATE_EXPERIENCE({ userId: mockedUser.id, experienceId: 2 }),
        ),
        async (req, res, ctx) => {
          const body = await req.json()
          requestFunc(body)
          return res(
            ctx.status(200),
            ctx.json({
              success: true,
            }),
          )
        },
      ),
      rest.delete(
        generateApiPath(
          Api.EXPERIENCE.DELETE_EXPERIENCE({ userId: mockedUser.id, experienceId: 2 }),
        ),
        async (req, res, ctx) => {
          requestFunc()
          return res(
            ctx.status(200),
            ctx.json({
              success: true,
            }),
          )
        },
      ),
      rest.post(generateApiPath(Api.EXPERIENCE.CREATE(mockedUser.id)), async (req, res, ctx) => {
        const body = await req.json()
        requestFunc(body)
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
          }),
        )
      }),
    ),
  navbar: ({ mockedUser }) =>
    setupServer(
      rest.get(generateApiPath(Api.USER.LOAD_USER), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { user: mockedUser },
          }),
        )
      }),
    ),
  createPostForm: ({ requestFunc }) =>
    setupServer(
      rest.post(generateApiPath(Api.POSTS.CREATE), async (req, res, ctx) => {
        const body = await req.json()
        requestFunc(body)
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
          }),
        )
      }),
    ),
  editPostForm: ({ requestFunc, mockedPost }) =>
    setupServer(
      rest.get(generateApiPath(Api.POSTS.GET_POST(1)), async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { post: mockedPost },
          }),
        )
      }),
      rest.put(generateApiPath(Api.POSTS.EDIT_POST(1)), async (req, res, ctx) => {
        const body = await req.json()
        requestFunc(body)
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
          }),
        )
      }),
      rest.delete(generateApiPath(Api.POSTS.DELETE_POST(1)), async (req, res, ctx) => {
        requestFunc({ id: mockedPost.id })
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
          }),
        )
      }),
    ),
  postListContainer: ({ mockedPosts }) =>
    setupServer(
      rest.get(generateApiPath(Api.POSTS.GET_ALL_POSTS), async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { posts: mockedPosts, meta: { last_page: 1 } },
          }),
        )
      }),
    ),
  profileContainer: ({ mockedUser }) =>
    setupServer(
      rest.get(generateApiPath(Api.USER.LOAD_USER), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { user: mockedUser },
          }),
        )
      }),
    ),
  updateProfileForm: ({ mockedUser, requestFunc }) =>
    setupServer(
      rest.get(generateApiPath(Api.USER.LOAD_USER), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { user: mockedUser },
          }),
        )
      }),
      rest.get(generateApiPath(Api.USER.GET_USER(mockedUser.id)), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { user: mockedUser },
          }),
        )
      }),
      rest.put(generateApiPath(Api.USER.UPDATE_USER(mockedUser.id)), async (req, res, ctx) => {
        const body = await req.json()
        requestFunc(body)
        return res(
          ctx.status(200),
          ctx.json({
            success: true,
          }),
        )
      }),
    ),
  usersListContainer: ({ mockedUsers }) =>
    setupServer(
      rest.get(generateApiPath(Api.USER.GET_ALL_USERS), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: { users: mockedUsers },
          }),
        )
      }),
    ),
}
