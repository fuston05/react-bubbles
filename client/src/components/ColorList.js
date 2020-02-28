import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" },
  id: Date.now()*Math.random()
};

const ColorList = ({ colors, updateColors }) => {
  console.log('colors', colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd]= useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log('colorToEdit', colorToEdit);
    // Make a put request to save your updated color
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(putRes => {
        let newColors = colors.map(color => {
          if (color.id === putRes.data.id) {
            return color = putRes.data
          } else { return color }
        })
        updateColors([
          ...newColors
        ])
        setColorToEdit(initialColor);
        console.log(putRes.data);
      })
      .catch(putErr => {
        console.log('putErr: ', putErr);
      })
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(delRes => {
        let newColors = colors.filter(color => {
          return parseInt(color.id) !== parseInt(delRes.data)
        });
        console.log('newColors', newColors)
        updateColors([
          ...newColors
        ])
        console.log('delRes.data: ', delRes.data);
      })
      .catch(delErr => { console.log(delErr); })
  }//end deleteColor

  const addNewColor= (e, colorToAdd) => {
    e.preventDefault();
    console.log('addcolor: ', colorToAdd);
    axiosWithAuth()
      .post('/api/colors', colorToAdd)
      .then(addRes => {
        updateColors([
          ...colors,
          addRes.data
        ])
        console.log('addRes', addRes);
      })
      .catch(addErr => {console.log(addErr);})
  }//end addNewColor

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit= {(e) => addNewColor(e, colorToAdd)}>
        <label htmlFor= 'colorName'>Color Name</label>
        <input 
          value= {colorToAdd.color}
          onChange= {(e) => setColorToAdd({
            ...colorToAdd,
            color: e.target.value
          })}
          type= 'text'
          name= 'colorName'
          id= 'colorName'
          placeholder= 'Color Name'
        />
        <label htmlFor= 'hex'>Color Hex</label>
        <input 
          value= {colorToAdd.hex}
          
          type= 'text'
          name= 'hex'
          id= 'hex'
          placeholder= 'Hex Value'
        />
        <button type= 'submit'>Add Color</button>
      </form>
      {console.log('colorToAdd: ', colorToAdd)}
    </div>
    
  );
};

export default ColorList;
