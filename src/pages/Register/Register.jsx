import { useAuth } from "@arcana/auth-react";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./Register.module.css";

const Register = () => {
    const auth = useAuth();
  const [pubAddr, setPubAddr] = useState("");
  const [sid, setSid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    const connectUsingArcana = async () => {
        // write code to connect with arcana auth

        console.log("connecting...")
        try{
            const provider = await auth.connect();
            console.log({provider});
            setPubAddr(auth.user.address);
            console.log(auth.user.address);
        }catch(error){
            console.log({error});
        }
    }

  return (
    <>
      <div className={styles.registerPageContainer}>
        <div className={`${styles.formBox}`}>
          <h2 className={`${styles.heading}`}>Register</h2>

          <button className={styles.connectWalletBtn} onClick={connectUsingArcana}>Connect Wallet</button>

          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Public Address</label>
            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Enter public address"
              onChange={(e) => setPubAddr(e.target.value)}
              value={pubAddr}
            />
          </div>
          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Full Name</label>
            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Aadhar Number</label>
            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Enter your VJTI Registration ID"
              onChange={(e) => setSid(e.target.value)}
              value={sid}
            />
          </div>

          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Mobile Number</label>
            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Enter your mobile number"
              onChange={(e) => setMobileNo(e.target.value)}
              value={mobileNo}
            />
          </div>

          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Email ID</label>
            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Enter your VJTI Email ID"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <button onClick={() => {}} className={styles.registerBtn}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
