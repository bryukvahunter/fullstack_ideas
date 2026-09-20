import _ from 'lodash'

export const ideas = _.times(100, (i) => ({
  nick: `cool-idea-${i}`,
  name: `idea ${i}`,
  description: `Описание идеи... №${i}`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}))
