

const user = JSON.parse( localStorage.getItem('user') );

const { token } = user;

const header = new Headers({
    'Authorization': token,
    'Content-Type': 'application/json'
});

//ENDPOINT BACKEND DJANGO API GATEWAY
const NOTE_API_GATEWAY = 'http://127.0.0.1:8000/api';

export const testNoteService = () => {
    console.log('TestNoteUser funcionando');
}

export const getNotes = async () => {


    try {
        
        const init = {
            method: 'GET',
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        const url = new Request(`${NOTE_API_GATEWAY}/notes-userid`, init );
        const resp = await fetch( url );
        const data = await resp.json();

        const { notes } = data;

        if ( typeof notes === 'string'){
            return ;

        }else {

            const note_list = data.notes.map( nt => {
                return {
                    id: nt.id,
                    title: nt.title,
                    content: nt.content,
                    date: nt.date
                }
            });
    
            return note_list;
        }

    } catch (error) {
        console.error( error );
    }

}

export const getNoteById = async ( id = null ) => {
    try{

        const init = {
            method: 'GET',
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        const url = new Request( `${NOTE_API_GATEWAY}/note-id/id=${id}`, init );
        const resp = await fetch( url );
        const data = await resp.json();

        const { note, status_code } = data;
        console.log( note );
        console.log( status_code );

        console.log( data );

        return data;

    } catch (error){
        console.log( error );
    }
}

export const addNote = async (data_note) => {
    try{

        const myInit = {
            method: 'POST',
            headers: header,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data_note)
        };



        const url = new Request('http://127.0.0.1:8000/api/add', myInit);
        const resp = await fetch(url);
        const data = await resp.json();

        console.log(data);
            
    } catch (error) {
        console.log(error);
    }
}

export const updateNoteById = async (id, data_note) => {
    try{

        const myInit = {
            method: 'PUT',
            headers: header,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data_note)
        };



        const url = new Request(`http://127.0.0.1:8000/api/update/id=${id}`, myInit);
        const resp = await fetch(url);
        const data = await resp.json();

        console.log(data);
            
    } catch (error) {
        console.log(error);
    }
}

export const deleteNoteById = async ( id ) => {
    try{

        const myInit = {
            method: 'DELETE',
            headers: header,
            mode: 'cors',
            cache: 'default'
        };



        const url = new Request(`http://127.0.0.1:8000/api/delete/id=${id}`, myInit);
        const resp = await fetch(url);
        const data = await resp.json();

        console.log(data);
            
    } catch (error) {
        console.log(error);
    }


}