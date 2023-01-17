import FocusLock from "react-focus-lock";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import type { Nullable } from "../lib/types";

const KeyboardEscape = "Escape";

enum KeyboardArrow {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown"
}

const keyboardArrows: string[] = [KeyboardArrow.ArrowUp, KeyboardArrow.ArrowDown];

type Option = {
  value: string;
  children: JSX.Element | string;
};

export type DropdownProps<Item> = {
  id: string;
  label: React.ReactNode;
  list: Array<Item>;
  itemActive: string;
  change: (item: Item) => void;
  itemClassName?: string;
};

export const Dropdown = <Item extends Option>({ id, label, list, change, itemClassName = "", itemActive }: DropdownProps<Item>) => {
  const [listening, setListening] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isFocusUnlocked, setIsFocusUnlocked] = useState(false);

  const changeButtonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonActiveRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => void setIsOpenMenu((isOpen) => !isOpen);

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === KeyboardEscape) {
      event.preventDefault();
      setIsFocusUnlocked(true);
      toggleMenu();
      return;
    }

    if (keyboardArrows.includes(event.key)) {
      event.preventDefault();
      const items = Array.from(listRef.current?.children ?? []) as HTMLLIElement[];
      const target = event.target as HTMLButtonElement;

      const itemPosition = Number(target.dataset["itemPosition"]);

      const currentItem = items[itemPosition];

      if (event.key === KeyboardArrow.ArrowDown && currentItem.nextSibling) {
        const nextItemButtonElement = currentItem.nextSibling.firstChild as HTMLButtonElement;
        if (nextItemButtonElement) return void nextItemButtonElement.focus();
      }

      if (event.key === KeyboardArrow.ArrowUp && currentItem.previousSibling) {
        const previousItemButtonElement = currentItem.previousSibling.firstChild as HTMLButtonElement;
        if (previousItemButtonElement) return void previousItemButtonElement.focus();
      }

      const itemsSize = items.length;

      if (itemsSize > 0) {
        const position = event.key === KeyboardArrow.ArrowDown ? 0 : itemsSize - 1;
        const lastItem = items[position].firstChild as HTMLButtonElement;
        if (lastItem) return void lastItem.focus();
      }
    }
  };

  useEffect(() => {
    if (isOpenMenu) {
      if (buttonActiveRef.current) {
        buttonActiveRef.current.focus();
        return;
      }
      const firstItem = listRef.current?.firstChild?.firstChild as Nullable<HTMLLIElement>;
      firstItem?.focus();
      return;
    }

    changeButtonRef.current?.focus();
  }, [isOpenMenu]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const click = (event: MouseEvent | TouchEvent) => {
        if (event.target && changeButtonRef.current?.contains(event.target as any)) return;
        setIsOpenMenu(false);
      };

      if (listening) return;
      if (!changeButtonRef.current) return;
      setListening(true);
      document.addEventListener("click", click);
    }
  }, [listening]);

  return (
    <div className="relative z-20">
      <button
        ref={changeButtonRef}
        id={id}
        aria-haspopup="true"
        aria-expanded={isOpenMenu}
        className="flex gap-2 text-md focus:outline-none focus:underline"
        onClick={toggleMenu}
      >
        {label}
      </button>
      {isOpenMenu && (
        <FocusLock disabled={isFocusUnlocked}>
          <ul
            ref={listRef}
            onKeyDown={onKeyDown}
            className="flex flex-col w-[200px] absolute top-10 -right-5 bg-paper header-shadow rounded-md"
            aria-labelledby={id}
          >
            {list.map((item, index) => {
              const isActive = item.value === itemActive;

              const className = classNames(itemClassName, {
                "bg-primary-light bg-opacity-50": isActive
              });

              return (
                <li key={item.value}>
                  <button ref={isActive ? buttonActiveRef : undefined} data-item-position={index} className={className} onClick={() => change(item)}>
                    {item.children}
                  </button>
                </li>
              );
            })}
          </ul>
        </FocusLock>
      )}
    </div>
  );
};
