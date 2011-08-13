/*
Max JS Toolkit
*/
//Midi Clip Functions:
//removes all notes in the Midi Clip passed as an argument
function removeAllClipNotes(liveObject) {
    liveObject.call("select_all_notes");
    liveObject.call('replace_selected_notes');
    liveObject.call("notes",0);
    liveObject.call("done");
}
//query's the clip passed an arguement and returns all midi notes in an Array object
function getClipNotes(liveObject) {
    tempNoteArray = new Array();
    routeList = new Array();
    liveObject.call("select_all_notes");
    var selectedNotes = liveObject.call("get_selected_notes");
    liveObject.call("deselect_all_notes");
    for (j = 2; j < (selectedNotes[1] * 6); j = j+6) {
        tempArray = selectedNotes.slice(j, j+6);
        tempArray[2] = Number(tempArray[2]).toFixed(3) * 1; //FUCK YOU JS
        tempArray[3] = Number(tempArray[3]).toFixed(3) * 1;
        tempNoteArray.push(tempArray);
        if (routeList.indexOf(selectedNotes[j+1]) === -1) {
            routeList.push(selectedNotes[j+1]);
            //debug("New midiValue " + selectedNotes[j+1]);
        }
    }   
    return tempNoteArray;
}

//replaces the notes passed in the clip arguement with an array of notes passed as the second arg
function updateClipNotes(liveObject,clipNotes) {
    liveObject.call("select_all_notes");
    liveObject.call('replace_selected_notes');
    liveObject.call("notes",0);
    liveObject.call("done");  
    liveObject.call("select_all_notes");
    liveObject.call("replace_selected_notes");
    liveObject.call("notes", clipNotes.length);
    for (i = 0; i<clipNotes.length; i++) {
        liveObject.call(clipNotes[i][0],clipNotes[i][1],Number(clipNotes[i][2]).toFixed(3),Number(clipNotes[i][3]).toFixed(3),clipNotes[i][4],clipNotes[i][5]);
    }
    liveObject.call("deselect_all_notes");
    liveObject.call("done");
}