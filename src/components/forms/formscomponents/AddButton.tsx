import React, { ChangeEvent } from 'react';
import styles from "./AddButton.module.css";

interface TextInputProps {
    name: string;
    url?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement> | undefined;
}

export default function AddButton({ name, url, onClick }: TextInputProps) {
    return (
        url ?
            <a href={url}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                    <title>{name}</title>
                    <g id="_8.add" data-name="8.add">
                        <circle cx="12" cy="12" r="11" />
                        <line x1="12" y1="6" x2="12" y2="18" />
                        <line x1="18" y1="12" x2="6" y2="12" />
                    </g>
                </svg>
            </a> : onClick &&
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={onClick}>
                <title>{name}</title>
                <g id="_8.add" data-name="8.add">
                    <circle cx="12" cy="12" r="11" />
                    <line x1="12" y1="6" x2="12" y2="18" />
                    <line x1="18" y1="12" x2="6" y2="12" />
                </g>
            </svg>
    );
}
