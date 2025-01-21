import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () =>{
    const [title, setTitle] = React.useState("");
    const [value, setValue] = React.useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();

    function createPaste(){
        const paste = {
            title : title,
            contetn : value,
            _id: pasteId || Date.now().toString(36),
            createdAt : new Date().toISOString(),
        }
        // update 
        if(pasteId){
            dispatch(updateToPastes(paste));
        }
        // Create (not exist)
        else{
            dispatch(addToPastes(paste));
        }
        // after creation and updation 
        setTitle("");
        setValue("");
        setSearchParams({});
    }

    return (
        <div>
            <div className="flex flex-row gap-7 place-content-evenly">
            <input 
                className="p-1  rounded-2xl mt-2 w-[67%] pl-4"
                type="text"
                placeholder="Enter Title Here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button
            onClick={createPaste}
            className="p-3  rounded-2xl mt-2"
            >
                {
                    pasteId ? "Update My paste" : "Create My Paste"
                }
            </button>
            </div>
            <div className="mt-8">
                <textarea 
                className="rounded-2xl mt-4 min-w-[500px] p-4 "
                value={value} 
                placeholder="Enter Content Here"
                onChange={(e) => setValue(e.target.value)}
                rows={20}
                
                >

                </textarea>
            </div>
        </div>
    );
}

export default Home;