import React from 'react'

interface TextDisplayProps {

}

const text = "Lorem ipsum dolor sit amet consectetur adipsicing elit. Maxime molliti, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident.";

export const TextDisplay: React.FC<TextDisplayProps> = ({ }) => {
    return (<>
        <div className='type'>
            <div className="details">
                <h3>0/50</h3>
                <h3>73%</h3>
            </div>
            <span className="text">
                {text}
            </span>
        </div>
    </>);
}