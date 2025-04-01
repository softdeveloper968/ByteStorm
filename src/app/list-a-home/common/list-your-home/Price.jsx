"use client";

import { BottomNavigationBar } from "@/app/list-a-home/common/BottomNavigationBar";
import { BreakLine } from "@/app/list-a-home/common/BreakLine";
import { isRenting } from "@/app/list-a-home/common/list-your-home/ListingStateBar";
import {
  inputStyleDiv,
  RequiredContainer,
  RequiredField,
} from "@/app/list-a-home/common/list-your-home/Location";
import { ensureNumberInEvent } from "@/app/list-a-home/common/validators";
import React from "react";

const Price = ({ data, setListingState, setListingData, editSection }) => {
  const inputStyle = {
    ...inputStyleDiv,
    width: "100%",
    margin: "0.5rem 0",
    borderColor: "#ECECEC",
  };
  const changeLease = (newValue, propertyName) => {
    const newData = { ...data };
    newData.price.rent.lease[propertyName] = Number(newValue);
    setListingData(newData);
  };

  function changeUtilities(value, propertyName) {
    const newData = { ...data };
    newData.price.rent.utilities[propertyName] = value.target.checked;
    setListingData(newData);
  }

  const changeDiscount = (e, propertyName) => {
    const newData = { ...data };
    newData.price.rent.discounts[propertyName] = e.target.checked;
    setListingData(newData);
  };

  function changePet(value, field) {
    const newData = { ...data };
    newData.price.rent.pets[field] = value;
    setListingData(newData);
  }

  return (
    <div
      style={{ fontFamily: "Roboto" }}
      className={"flex justify-start flex-col max-w-full"}
    >
      <h2>Home Price</h2>
      <h4>I want to</h4>
      {data.price.price !== null && !isRenting() ? (
        <>
          <DivCheckboxLabel>
            <input
              type={"radio"}
              checked={!data.price.forRent}
              onChange={(e) => {
                let newData = { ...data };
                newData.price.forRent = false;
                setListingData(newData);
              }}
            />
            <span className={"ml-2"}>List my home for sale</span>
          </DivCheckboxLabel>
          <DivCheckboxLabel>
            <input
              type="radio"
              checked={data.price.forRent}
              onChange={(e) => {
                let newData = { ...data };
                newData.price.forRent = true;
                setListingData(newData);
              }}
            />
            <span className={"ml-2"}>List my home for sale and rent</span>
          </DivCheckboxLabel>
        </>
      ) : (
        <>
          <DivCheckboxLabel>
            <input
              type={"radio"}
              checked={data.price.price === null}
              onChange={(e) => {
                let newData = { ...data };
                newData.price.price = null;
                setListingData(newData);
              }}
            />
            <span className={"ml-2"}>List my home for rent</span>
          </DivCheckboxLabel>
          <DivCheckboxLabel>
            <input
              type="radio"
              checked={data.price.price !== null}
              onChange={(e) => {
                let newData = { ...data };
                newData.price.price = 0;
                setListingData(newData);
              }}
            />
            <span className={"ml-2"}>List my home for sale and rent</span>
          </DivCheckboxLabel>
        </>
      )}
      <p className={"my-2"}>
        *Listing a home for ‘sale and rent’ will make your home available in
        both areas of the website. Only one fee is charged per home listed where
        applicable.
      </p>
      {/*INFO: PRICE*/}
      {data.price.price !== null && (
        <>
          <h4 className={"pt-4"}>Home Price*</h4>
          <RequiredContainer>
            <input
              required
              style={{ ...inputStyleDiv, width: "50%" }}
              type="text"
              value={`$ ${data.price.price.toLocaleString()}`}
              placeholder={"$ 900,123"}
              onChange={(e) => {
                let newData = { ...data };
                newData.price.price = Number(
                  ensureNumberInEvent(e).target.value,
                );
                setListingData(newData);
              }}
            />
            <RequiredField />
          </RequiredContainer>
        </>
      )}
      {data.price.forRent && (
        <>
          <BreakLine />
          <h2>Rental Information</h2>
          <div className={"flex w-full items-start my-4 flex-col"}>
            <div className={"flex"}>
              <MiniContainer>
                <h6>Monthly Rent*</h6>
                {/*INFO: PRICE*/}
                <RequiredContainer>
                  <input
                    type={"text"}
                    required
                    style={inputStyle}
                    placeholder={"$ 2,300"}
                    value={`$ ${data.price.rent.lease.monthlyRent.toLocaleString()}`}
                    onChange={(e) => {
                      let newNumber = e.target.value.replace(/[^0-9]/g, "");
                      changeLease(newNumber, "monthlyRent");
                    }}
                  />
                  <RequiredField />
                </RequiredContainer>
              </MiniContainer>
              <MiniContainer>
                <h6>Deposit*</h6>
                <RequiredContainer>
                  <input
                    type={"text"}
                    required
                    style={inputStyle}
                    placeholder={"$"}
                    value={`$ ${data.price.rent.lease.deposit.toLocaleString()}`}
                    onChange={(e) => {
                      let newNumber = e.target.value.replace(/[^0-9]/g, "");
                      changeLease(newNumber, "deposit");
                    }}
                  />
                  <RequiredField />
                </RequiredContainer>
              </MiniContainer>
              <MiniContainer>
                <h6>Lease length (months)*</h6>
                <RequiredContainer>
                  <input
                    type={"text"}
                    style={inputStyle}
                    required
                    value={data.price.rent.lease.leaseLength}
                    onChange={(e) => {
                      let newNumber = e.target.value.replace(/[^0-9]/g, "");
                      changeLease(newNumber, "leaseLength");
                    }}
                  />
                  <RequiredField />
                </RequiredContainer>
              </MiniContainer>
            </div>
            <h6>Rent or deposit discounts</h6>
            <MiniContainer className={"grid grid-cols-2 space-y-1"}>
              <DivCheckboxLabel>
                <input
                  type="checkbox"
                  checked={data.price.rent.discounts.military}
                  onChange={(e) => {
                    changeDiscount(e, "military");
                  }}
                />
                <span>Military</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  type="checkbox"
                  checked={data.price.rent.discounts.policeFirefighter}
                  onChange={(e) => {
                    changeDiscount(e, "policeFirefighter");
                  }}
                />
                <span>EMS / healthcare</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  type="checkbox"
                  checked={data.price.rent.discounts.healthcare}
                  onChange={(e) => {
                    changeDiscount(e, "healthcare");
                  }}
                />
                <span>Police / Firefighter</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  type="checkbox"
                  checked={data.price.rent.discounts.teacher}
                  onChange={(e) => {
                    changeDiscount(e, "teacher");
                  }}
                />
                <span>Teacher</span>
              </DivCheckboxLabel>
            </MiniContainer>
            <BreakLine />
            <h2>Pets</h2>
            <div className={"grid grid-cols-3"}>
              <MiniContainer>
                <h6>Pets allowed</h6>
                <DivCheckboxLabel>
                  <input
                    type="radio"
                    checked={data.price.rent.pets.allowed}
                    onChange={(e) => changePet(true, "allowed")}
                  />
                  <span>Yes</span>
                  <input
                    type="radio"
                    checked={!data.price.rent.pets.allowed}
                    onChange={(e) => changePet(false, "allowed")}
                  />
                  <span>No</span>
                </DivCheckboxLabel>
              </MiniContainer>
              {data.price.rent.pets.allowed && (
                <>
                  <MiniContainer>
                    <h6>Pet type</h6>
                    <div className={"grid grid-cols-2 space-y-1"}>
                      <DivCheckboxLabel>
                        <input
                          type="checkbox"
                          checked={data.price.rent.pets.allowedTypes.includes(
                            "dog",
                          )}
                          onChange={(e) => {
                            let oldTypes = [
                              ...data.price.rent.pets.allowedTypes.filter(
                                (t) => "dog" !== t,
                              ),
                              e.target.checked && "dog",
                            ];
                            changePet(
                              oldTypes.filter((t) => t !== false),
                              "allowedTypes",
                            );
                          }}
                        />{" "}
                        <span>Dog</span>
                      </DivCheckboxLabel>
                      <DivCheckboxLabel>
                        <input
                          type="checkbox"
                          checked={data.price.rent.pets.allowedTypes.includes(
                            "fish",
                          )}
                          onChange={(e) => {
                            let oldTypes = [
                              ...data.price.rent.pets.allowedTypes.filter(
                                (t) => "fish" !== t,
                              ),
                              e.target.checked && "fish",
                            ];
                            changePet(
                              oldTypes.filter((t) => t !== false),
                              "allowedTypes",
                            );
                          }}
                        />
                        <span>Fish</span>
                      </DivCheckboxLabel>
                      <DivCheckboxLabel>
                        <input
                          type="checkbox"
                          checked={data.price.rent.pets.allowedTypes.includes(
                            "cat",
                          )}
                          onChange={(e) => {
                            let oldTypes = [
                              ...data.price.rent.pets.allowedTypes.filter(
                                (t) => "cat" !== t,
                              ),
                              e.target.checked && "cat",
                            ];
                            changePet(
                              oldTypes.filter((t) => t !== false),
                              "allowedTypes",
                            );
                          }}
                        />
                        <span>Cat</span>
                      </DivCheckboxLabel>
                      <DivCheckboxLabel>
                        <input
                          type="checkbox"
                          checked={data.price.rent.pets.allowedTypes.includes(
                            "other",
                          )}
                          onChange={(e) => {
                            let oldTypes = [
                              ...data.price.rent.pets.allowedTypes.filter(
                                (t) => "other" !== t,
                              ),
                              e.target.checked && "other",
                            ];
                            changePet(
                              oldTypes.filter((t) => t !== false),
                              "allowedTypes",
                            );
                          }}
                        />
                        <span>Other</span>
                      </DivCheckboxLabel>
                    </div>
                  </MiniContainer>

                  <MiniContainer>
                    <h6>Breed Restrictions</h6>
                    <DivCheckboxLabel>
                      <input
                        type="radio"
                        checked={data.price.rent.pets.breedRestrictions}
                        onChange={() => changePet(true, "breedRestrictions")}
                      />
                      <span>Yes</span>
                    </DivCheckboxLabel>
                    <DivCheckboxLabel>
                      <input
                        type="radio"
                        checked={!data.price.rent.pets.breedRestrictions}
                        onChange={() => changePet(false, "breedRestrictions")}
                      />
                      <span>No</span>
                    </DivCheckboxLabel>

                    {data.price.rent.pets.breedRestrictions && (
                      <>
                        <h6>Breed not allowed</h6>
                        <input
                          type="text"
                          value={
                            data.price.rent.pets.breedRestrictionsDescription
                          }
                          onChange={(e) =>
                            changePet(
                              e.target.value,
                              "breedRestrictionsDescription",
                            )
                          }
                          style={inputStyle}
                        />
                      </>
                    )}
                  </MiniContainer>

                  <MiniContainer>
                    <h6>Monthly pet rent</h6>
                    <input
                      type="text"
                      style={inputStyle}
                      value={`$ ${data.price.rent.pets.monthlyPetRent.toLocaleString()}`}
                      onChange={(e) => {
                        let newE = { ...e };
                        newE.target.value = e.target.value.replace(
                          /[^0-9]/g,
                          "",
                        );
                        changePet(Number(newE.target.value), "monthlyPetRent");
                      }}
                      placeholder={"$"}
                    />
                  </MiniContainer>
                  <MiniContainer>
                    <h6>Pet Deposit</h6>
                    <input
                      type="text"
                      value={`$ ${data.price.rent.pets.petDeposit.toLocaleString()}`}
                      onChange={(e) => {
                        let newE = { ...e };
                        newE.target.value = e.target.value.replace(
                          /[^0-9]/g,
                          "",
                        );
                        changePet(Number(newE.target.value), "petDeposit");
                      }}
                      style={inputStyle}
                      placeholder={"$"}
                    />
                  </MiniContainer>
                </>
              )}
            </div>
            <BreakLine />
            <h2>Utilities included in rent</h2>
            <div className={"grid grid-cols-4"}>
              <DivCheckboxLabel>
                <input
                  onChange={(e) => changeUtilities(e, "water")}
                  checked={data.price.rent.utilities.water}
                  type="checkbox"
                />
                <span>Water</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  onChange={(e) => changeUtilities(e, "trash")}
                  checked={data.price.rent.utilities.trash}
                  type="checkbox"
                />
                <span>Trash</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  onChange={(e) => changeUtilities(e, "snowRemoval")}
                  checked={data.price.rent.utilities.snowRemoval}
                  type="checkbox"
                />
                <span>Snow removal</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  onChange={(e) => changeUtilities(e, "other")}
                  checked={data.price.rent.utilities.other}
                  type="checkbox"
                />
                <span>Other</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  onChange={(e) => changeUtilities(e, "gas")}
                  checked={data.price.rent.utilities.gas}
                  type="checkbox"
                />
                <span>Gas</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  onChange={(e) => changeUtilities(e, "electric")}
                  checked={data.price.rent.utilities.electric}
                  type="checkbox"
                />
                <span>Electric</span>
              </DivCheckboxLabel>
              <DivCheckboxLabel>
                <input
                  onChange={(e) => changeUtilities(e, "lawnCare")}
                  checked={data.price.rent.utilities.lawnCare}
                  type="checkbox"
                />
                <span>Lawn care</span>
              </DivCheckboxLabel>
            </div>
          </div>
        </>
      )}
      {!editSection && (
        <BottomNavigationBar
          setListingState={setListingState}
          setListingData={setListingData}
          data={data}
        />
      )}
    </div>
  );
};

export default Price;

const DivCheckboxLabel = (props) => (
	<div className={'flex items-center justify-start me-8 [&>input]:m-2 ' + props.className}>
		{props.children}
	</div>);

export const MiniContainer = (props) => (<div className={'mt-2 me-12 mb-12 shadow-none ' + props.className}>
	{props.children}
</div>);