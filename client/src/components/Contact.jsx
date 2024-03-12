import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import "../pagesStyles/Contact.css";

const Contact = ({ contacts, changeChat, currentUser }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const data = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

        if (currentUser) {
          setCurrentUserImage(currentUser.avatarImage);
          setCurrentUserName(currentUser.username);
        }

        // setCurrentUserName(data.username);
        // setCurrentUserImage(data.avatarImage);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    };
    fetchUserName();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <div className="contacts-main-container-log">
        {currentUserImage && (
          <div className="contacts-main-container">
            <div className="contacts-brand">
              <img src={Logo} alt="logo" className="contacts-brand-img" />
              <h3 className="contacts-brand-h3">snappy</h3>
            </div>
            <div className="contacts-brand-contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contacts--contacts ${
                      index === currentSelected ? "contacts-selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar-contacts--contacts">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                        className="avatar-contacts--contacts-img"
                      />
                    </div>
                    <div>
                      <h3 className="contacts-username-contacts">
                        {contact.username}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="contacts-current-user">
          {currentUserImage && (
            <>
              <div>
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                  className="avatar-contacts--contacts-img-2"
                />
              </div>
              <div>
                <h2 className="contacts--contacts-usename-2">
                  {currentUserName}
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
