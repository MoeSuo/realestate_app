export const deleteUserPlant = (id) => {
    if (!id) {
        throw new Error('No id provided!')
    }

   return fetch('/api/userPlants?' + new URLSearchParams({
      id: id,
    }), {
      method: 'DELETE',
    })
  }
export const deleteNote = (id) => {
    if (!id) {
        throw new Error('No id provided!')
    }

   return fetch('/api/notes?' + new URLSearchParams({
      id: id,
    }), {
      method: 'DELETE',
    })
  }
  export const updateNote =  (id, updatedNote) => {
    if(!id) {
      console.log(updatedNote)
      throw new Error ('No id provided!')
    }
    return fetch ('/api/notes?' + new URLSearchParams({
        id: id,
    }), {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote)
      
    })
  };
  