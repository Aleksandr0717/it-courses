export const courseLevel = [
  {
    id: 1,
    title: 'Начальный уровень',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Средний уровень',
    color: 'yellow'
  },
  {
    id: 3,
    title: 'Продвинутый уровень',
    color: 'orange'
  }
]

export const findTitle = (id: string) => {
  return courseLevel.find((item) => item.id === parseInt(id))?.title;
};
