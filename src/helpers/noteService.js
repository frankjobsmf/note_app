import { axiosAPI } from "./token-interceptor";


const getAllNotesByUser = async () => {
        
        const response = await axiosAPI.get( '/notes-userid' );

        const { notes } = response.data;

        console.log( notes )

        return notes;
};

const addNote = ( title, content ) => {
    axiosAPI.post( '/add', { title, content } );

}

export {
    getAllNotesByUser,
    addNote,
};