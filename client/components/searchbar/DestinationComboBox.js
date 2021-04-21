import { useState } from 'react';
import { useCombobox } from 'downshift';
import { useRouter } from 'next/router';
import { COUNTRIES_LIST } from '../../utils/countriesList';

export default function DestinationComboBox({
  selectedItem,
  selectedItemChangeHandler,
}) {
  const [inputItems, setInputItems] = useState(COUNTRIES_LIST);

  const { query } = useRouter();

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    // 'id' Handles SSR warning error
    id: 'destination-combo-box',
    items: inputItems,
    selectedItem,
    initialSelectedItem: query['country[eq]'] ? query['country[eq]'] : null,
    initialInputValue: query['country[eq]'] ? query['country[eq]'] : '',
    onSelectedItemChange: ({ selectedItem }) =>
      selectedItemChangeHandler(selectedItem),
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        COUNTRIES_LIST.filter(item =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <div className="relative lg:static w-full">
      <label
        className="capitalize self-start text-gray-400 text-xs font-light pl-4"
        {...getLabelProps()}
      >
        Destination
      </label>
      <div
        className="flex px-4 py-2 group border-0 border-b border-gray-200 focus-within:border-gray-900"
        {...getComboboxProps()}
      >
        <input
          className="flex-grow focus:outline-none focus:ring-0 bg-transparent"
          placeholder="Where do you want to go?"
          {...getInputProps()}
        />
        <button
          className={`px-2 text-gray-300 hover:text-gray-900 ${
            isOpen && 'transform rotate-180'
          }`}
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </button>
      </div>
      <ul
        className={`${
          isOpen ? 'visible' : 'invisible'
        } visible absolute mt-2 p-2 border z-50 w-full lg:min-w-max lg:max-w-md max-h-52 lg:max-h-96 bg-white overflow-y-scroll`}
        {...getMenuProps()}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={`${
                highlightedIndex === index ? 'bg-gray-300' : ''
              } flex justify-start items-center py-1 px-2`}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              <span className="pr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}
