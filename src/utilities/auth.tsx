import React, { useState } from 'react';
import { auth, googleProvider } from '../components/config/notelify-firebase';
import {
   createUserWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from 'firebase/auth';

const Auth = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   // console.log(auth.currentUser?.email);

   const signIn = async () => {
      try {
         await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
         console.log(err);
      }
   };

   const signInWithGoogle = async () => {
      try {
         await signInWithPopup(auth, googleProvider);
      } catch (err) {
         console.log(err);
      }
   };

   const logout = async () => {
      try {
         await signOut(auth);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div>
         <h2>Authentication</h2>
         <div className=" flex flex-col md:flex-row gap-4">
            <div className="border-2 p-2 rounded-md">
               <input
                  className="bg-transparent focus:outline-none w-full"
                  placeholder="Email..."
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
               />
            </div>
            <div className="border-2 p-2 rounded-md">
               <input
                  className="bg-transparent focus:outline-none w-full"
                  placeholder="Password..."
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
               />
            </div>
         </div>
         {/* Buttons */}
         <button
            onClick={signIn}
            className="bg-[#e69c5e] mt-4 p-2 rounded-md w-44"
         >
            Sign In
         </button>

         <button
            onClick={signInWithGoogle}
            className="bg-[#e69c5e] mt-4 p-2 rounded-md w-44"
         >
            Sign In with Google
         </button>

         <button
            onClick={logout}
            className="bg-[#e69c5e] mt-4 p-2 rounded-md w-44"
         >
            Logout
         </button>
      </div>
   );
};

export default Auth;
