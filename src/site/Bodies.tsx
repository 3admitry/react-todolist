import React from 'react';

type PropsType = {
    title: string
    countli: number
}

export function Bodies(props: PropsType) {
    return (
        <div>
            <ul>
                <li><span>{props.title}</span></li>
                <li><span>{props.title} {props.countli + 2}</span></li>
                <li><span>{props.title} {props.countli + 3}</span></li>
                <li><span>{props.title} {props.countli + 4}</span></li>
                <li><span>{props.title} {props.countli + 5}</span></li>
            </ul>
        </div>
    );
}