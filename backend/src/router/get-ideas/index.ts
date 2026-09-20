import _ from 'lodash'
import { ideas, trpc } from '../../lib'

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return {
    ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])),
  }
})
