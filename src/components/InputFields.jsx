// components/InputFields.js
import React, { useEffect, useState } from 'react';

const InputFields = ({ handleChange, setResumeData }) => {
    const [additionalFields, setAdditionalFields] = useState({
        experience: [{ title: '', description: '' }],
        education: [{ title: '', description: '' }],
        projects: [{ title: '', description: '' }],
        achievements: [{ title: '', description: '' }],
        skills: ['']
    });

    const handleAddField = (fieldType) => {
        const updatedFields = { ...additionalFields };
        if (fieldType === 'skills') {
            updatedFields[fieldType].push('');
        } else {
            updatedFields[fieldType].push({ title: '', description: '' });
        }
        setAdditionalFields(updatedFields);
    };

    const handleRemoveField = (fieldType, index) => {
        const updatedFields = { ...additionalFields };
        updatedFields[fieldType].splice(index, 1);
        setAdditionalFields(updatedFields);
    };

    const handleFieldChange = (fieldType, index, fieldName, value) => {
        const updatedFields = { ...additionalFields };
        if (fieldType === 'skills') {
            updatedFields[fieldType][index] = value;
        } else {
            updatedFields[fieldType][index][fieldName] = value;
        }
        setAdditionalFields(updatedFields);
    };
useEffect(() => {
 console.log(additionalFields)
}, [additionalFields])
useEffect(() => {
    // Pass the updated additionalFields to the parent component
    setResumeData(prevData => ({
        ...prevData,
        ...additionalFields
    }));
}, [additionalFields, setResumeData]);
const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         setAdditionalFields(prevFields => ({
           ...prevFields,
           image: reader.result
         }));
       };
       reader.readAsDataURL(file);
    }
   };
   

const renderAdditionalFields = (fieldType) => {
    if (fieldType === 'skills') {
        return (
          <>
            {additionalFields[fieldType].map((skill, index) => (
              <div key={index} className="flex mb-4">
                <input
                  type="text"
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleFieldChange(fieldType, index, null, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus-within:ring"
                />
                <button onClick={() => handleRemoveField(fieldType, index)} className="px-3 py-1 bg-red-500 text-white rounded-md ml-2">
                  Remove
                </button>
              </div>
            ))}
          </>
        );
    } else {
        // Render additional fields for other types (e.g., experience, education, etc.)
        return additionalFields[fieldType].map((field, index) => (
            <div key={index} className="flex mb-4">
                <input
                    type="text"
                    placeholder={`${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Title`}
                    value={field.title}
                    onChange={(e) => handleFieldChange(fieldType, index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mr-2 outline-none focus-within:ring"
                />
                <textarea
                    placeholder={`${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Description`}
                    value={field.description}
                    onChange={(e) => handleFieldChange(fieldType, index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus-within:ring"
                />
                <button onClick={() => handleRemoveField(fieldType, index)} className="px-3 py-1 bg-red-500 text-white rounded-md ml-2">
                    Remove
                </button>
            </div>        ));
    }
};




    const renderAddButton = (fieldType) => {
        return (
            <button onClick={() => handleAddField(fieldType)} className="px-3 py-1 bg-blue-500 text-white rounded-md mb-4">
                Add More {fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}
            </button>
        );
    };

    return (
        <div className="w-full flex flex-col text-black">
            <label className='mb-3' htmlFor="profilePic">Profile Photo:</label>
            <input
 type="file"
 accept="image/*"
 id='profilePic'
 onChange={handleImageUpload}
 className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus-within:ring"
/>

            <input type="text" id="fullName" placeholder="Full Name" onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus-within:ring" />
            <input type="text" id="jobTitle" placeholder="Job Title" onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus-within:ring" />
            <textarea id="summary" placeholder="Summary" onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus-within:ring"></textarea>
            <input type="text" id="phoneNumber" maxLength={10} placeholder="Phone Number" onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus-within:ring" />
            <input type="text" id="email" placeholder="E-mail" onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus-within:ring" />
            <input type="text" id="address" placeholder="Address" onChange={handleChange} className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus-within:ring" />
             {/* Render additional fields for Skills */}
            {renderAdditionalFields('skills')}
             
            
            {renderAddButton('skills')}
            {/* Render additional fields for Work Experience */}
            {renderAdditionalFields('experience')}
            {renderAddButton('experience')}

            {/* Render additional fields for Education */}
            {renderAdditionalFields('education')}
            {renderAddButton('education')}

            {/* Render additional fields for Projects */}
            {renderAdditionalFields('projects')}
            {renderAddButton('projects')}

            {/* Render additional fields for Achievements */}
            {renderAdditionalFields('achievements')}
            {renderAddButton('achievements')}

          
        </div>
    );
};

export default InputFields;
