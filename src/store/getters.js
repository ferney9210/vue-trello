export default {
  getListsByBoard: (state) => (boardId) => {
    return Object.values(state.lists)
      .filter(list => list.board === boardId)
  },

  getTasksfromList: (state) => (listId) =>{
    return Object.values(state.tasks)
      .filter(task => task.list === listId)
  }
}
