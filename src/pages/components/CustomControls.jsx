import React, { useState, Fragment, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Html } from "@react-three/drei";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CustomControls({
  isControlVisible,
  toggleControlVisibility,
  selection,
  setSelection,
  color,
  setColor,
  visible,
  setVisible,
  opacity,
  setOpacity,
  name,
  setName,
  saveMeshData,
  note,
  setNote,

  toggleControls, // passed from the parent component e.g Apartment_001.jsx
  toggleHidden, // passed from the parent component e.g Apartment_001.jsx
  dismissToasts,
}) {
  console.log(selection);

  const [isComponentVisible, setComponentVisibility] = useState(true);
    // Initialize state variables to track input changes
    const [isDirty, setIsDirty] = useState(false);
  // Create refs to store initial values
  const initialSelectionRef = useRef(selection);
  const initialColorRef = useRef(color);
  const initialVisibleRef = useRef(visible);
  const initialOpacityRef = useRef(opacity);
  const initialNameRef = useRef(name);
  const initialNoteRef = useRef(note);

  useEffect(() => {
    // Check if any of the input values have changed
    const hasChanged =
      selection !== initialSelectionRef.current ||
      color !== initialColorRef.current ||
      visible !== initialVisibleRef.current ||
      opacity !== initialOpacityRef.current ||
      name !== initialNameRef.current ||
      note !== initialNoteRef.current;

    setIsDirty(hasChanged);
  }, [selection, color, visible, opacity, name, note]);

  // Add a CSS class based on whether the "Save" button should be active
  const saveButtonClass = isDirty
    ? "active-save-button"
    : "inactive-save-button";


 // Show a toast warning when there are unsaved changes and the component is closed
    const [showUnsavedChangesToast, setShowUnsavedChangesToast] = useState(false);

    useEffect(() => {
      // Show a toast warning when there are unsaved changes and the component is closed
      const handleBeforeUnload = (event) => {
        if (isDirty) {
          event.preventDefault();
          event.returnValue = "";
          setShowUnsavedChangesToast(true);
        }
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [isDirty]);

    useEffect(() => {
      // Display a toast when there are unsaved changes
      if (showUnsavedChangesToast) {
        toast.warn(
          
          (
            
            <>
              <p className="relative text-center custom-toast">You have unsaved changes.</p>
              <button
                className="relative text-center h-20 w-full bg-blue-500 text-white my-2  hover:bg-blue-600"
                onClick={() => {
                  // Reset changes and close the toast
                  setIsDirty(false);
                  setShowUnsavedChangesToast(false);
                  toast.dismiss(); // Dismiss the toast
                   saveMeshData()
                }}
              >
                Save
              </button>
              <p className="relative text-center ">OR</p>
              <button
                className="relative text-center h-20 w-full bg-zinc-100 my-2 hover:bg-zinc-200"
                onClick={() => {
                  // Reset changes and close the toast
                  setIsDirty(false);
                  setShowUnsavedChangesToast(false);
                  toast.dismiss(); // Dismiss the toast
                }}
              >
                Cancel Changes
              </button>
            </>
          ),
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false, // Keep the toast open until the user interacts with it
            closeButton: true, // Show a close button on the toast
            onClose: () => setShowUnsavedChangesToast(false), // Reset the state when the toast is closed
            // icon: false, // Remove the icon
            icon: <div style={{ width: "10px !important"  }} />, // Replace the icon with an empty space
          }
        );
      }
    }, [showUnsavedChangesToast]);



  return (
    <group>
      <Fragment>
        <Html style={{ position: "fixed", top: 0, left: 0 }}>
          {/* Your control UI code here */}
          {isComponentVisible && (
            <div
              className={`control-div_02 rounded-lg ${
                isControlVisible ? "" : "collapsed"
              }`}
            >
              <div className="control-header ">
                <div className="flex justify-between items-center">
                  <button
                    onClick={toggleControlVisibility}
                    className="flex justify-between w-[80%] h-12 items-center bg-gray-200 p-2"
                  >
                    {isControlVisible ? (
                      <>
                        <span>Collapse</span>
                        <FontAwesomeIcon icon={faChevronUp} />
                      </>
                    ) : (
                      <>
                        <span style={{ marginLeft: "4px" }}>Expand</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </>
                    )}
                  </button>


                  {/* close button */}
                  <button
                    className=" w-10 h-10 bg-black text-white rounded-full cursor-pointer"
                    onClick={() => {
                      if (isDirty) {
                        setShowUnsavedChangesToast(true);
                      } else if (toggleControls && toggleHidden) {
                        toggleControls();
                        toggleHidden();
                        // toast.dismiss()
                        //  dismissVisibleToast(); // Dismiss visible toasts
                        dismissToasts(); // Call the dismissToasts function in the parent
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                {/* close button */}


              </div>
              {isControlVisible && (
                <div className="control-content">
                  {/* Render other control elements here */}
                  <label className="block text-gray-700 text-sm my-2">
                    <strong> Availability: </strong>
                    <select
                      className="flex px-2 flex-col uppercase tracking-wide text-gray-700 text-xs w-full h-8 my-1"
                      value={selection}
                      onChange={(e) => setSelection(e.target.value)}
                    >
                      <option value="none">None</option>
                      <option value="sold">Sold</option>
                      <option value="available">Available</option>
                    </select>
                  </label>
                  {/* Add other controls here */}
                  <br />
                  <label className="flex flex-row justify-between  text-gray-700 text-sm  my-2">
                    <strong> Color:</strong>
                    <input
                      className="w-[70%]"
                      type="color"
                      value={
                        selection === "available"
                          ? "#008000"
                          : selection === "sold"
                          ? "#FF0000"
                          : color
                      }
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </label>
                  <br />
                  <label className="flex justify-between text-gray-700 text-sm  my-2">
                    <strong>Visible:</strong>
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={() => setVisible(!visible)}
                    />
                  </label>
                  <br />
                  <label className="block text-gray-700 text-sm  my-2">
                    <strong>Opacity:</strong>
                    <input
                      className="focus:outline-none px-2 w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 my-2  h-8 "
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={opacity}
                      onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    />
                  </label>
                  <br />
                  <label className="flex justify-between text-gray-700 text-sm  my-2 items-center">
                    <strong className="w-[25%]">Unit Name:</strong>
                    <input
                      className="bg-green-50 border w-[70%] border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block  p-2.5 dark:bg-gray-700 dark:border-green-500"
                      type="button"
                      value={` ${name}`}
                    />
                    {/* <textarea
                  value={name}
                  // onChange={(e) => setNote(e.target.value)}
                /> */}
                  </label>
                  <br />
                  <label className="block text-gray-700 text-sm w-full my-2">
                    <strong>Note:</strong>
                    <textarea
                      className="block text-gray-700 text-sm w-full my-2 bg-gray-100 "
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </label>
                  <br />
                  {/* ... */}
                  <button
                    className={`relative text-center h-20 w-full transition-all duration-500
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-zinc-400 before:transition-all
      before:duration-300 before:opacity-10 before:hover:opacity-0 before:hover:scale-50
      after:absolute after:top-0 after:left-0 after:w-full after:h-full after:opacity-0 after:transition-all after:duration-300
      after:border after:border-white/50 after:scale-125 after:hover:opacity-100 after:hover:scale-100  ${saveButtonClass}`}
                    onClick={saveMeshData}
                    disabled={!isDirty}
                  >
                    Save
                  </button>
                  {!isDirty && (
  <p className="text-gray-500 mt-2">No changes to save</p>
)}
                </div>
              )}
            </div>
          )}
        </Html>
      </Fragment>
    </group>
  );
}

export default CustomControls;
