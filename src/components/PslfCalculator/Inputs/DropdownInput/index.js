import React, {useState} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropdownInput = (props) => {
    const [dropdownSettings, setDropdownSettings] = useState({
        dropdownOpen: false,
    }); 

    const toggle = () => {
        setDropdownSettings({
            dropdownOpen: !dropdownSettings.dropdownOpen
        });
    }

    const data = () => {
        let options = [];
        for (let val of props.options) {
            options.push(
                <DropdownItem key={val} value={val} onClick={props.onClick} name={props.name} index={props.index || 0}>
                    { val }
                </DropdownItem>
            );
        }
        return options;
    }
    
    return (
        <Dropdown size="sm" isOpen={dropdownSettings.dropdownOpen} toggle={toggle} className="inline">
            <DropdownToggle caret color="light" className={(props.size === "sm" ? "dropdown-style dropdown-sm " : "dropdown-style dropdown-md ") + (props.valid !== '' ? 'invalid-field' : '')}>
                { props.value || props.defaultText}
            </DropdownToggle>
            <DropdownMenu>
                { data() }
            </DropdownMenu>
        </Dropdown>
    )
}

export default DropdownInput;