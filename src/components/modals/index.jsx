"use client"

import React from "react";
import { Modal } from "@mui/material";
import { useModal } from "@/context/ModalContext"
import ProfileCard from "@/app/new-find-a-pro/components/ProfileCard";
import AddAPro from "@/app/new-find-a-pro/components/Add-A-Pro";
import InviteSent from "@/app/new-find-a-pro/components/Invite-Sent";

const ModalManager = () => {
    const { activeModal,closeModal,isModalOpened } = useModal();

    const renderModal = () => {
        switch (activeModal) {
            case "profileCard":
                return <ProfileCard />;
            case "addAPro":
                return <AddAPro />
            case "inviteSent":
                return <InviteSent />
        }
    };    

    return (
        <Modal open={isModalOpened} onClose={closeModal}>
            <div className="modal-box bg-mw_white text-mw_black rounded-lg">
                {renderModal()}
            </div>
        </Modal>
    );
};

export default ModalManager;
