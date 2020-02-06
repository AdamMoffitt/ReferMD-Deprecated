// ItemService.js
// import { db } from '../Config/Firebase';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const doctorRef = firestore().collection('doctors');

export const getAllDoctors = async (specialty) => {
    console.log('Get Doctors data');
    const doctorSnapshot = await doctorRef.orderBy('type', "desc").get();
    // console.log('User data', doctorSnapshot.docs);
    return doctorSnapshot.docs.map((doctor) => {
        const name = doctor.data().firstName.concat(doctor.data().lastName);
        console.log(name);
        return doctor.data();
    })
}

export const getDoctorsBySpecialty = async (specialty) => {
    console.log('Get Doctors data by specialty');
    console.log(specialty);
    const doctorSnapshot = await doctorRef.where("specialty", "==", specialty).orderBy('type', "desc").get();
    // console.log('User data', doctorSnapshot.docs);
    return doctorSnapshot.docs.map((doctor) => {
        const name = doctor.data().firstName.concat(doctor.data().lastName);
        console.log(name);
        return doctor.data();
    })
}

export const getDoctorsBySpecialtyAndSubSpecialty = async (specialty, subSpecialty) => {
    console.log('Get Doctors data by specialty');
    const doctorSnapshot = await doctorRef.where("specialty", "==", specialty).where("subSpecialty", "==", subSpecialty).orderBy('type', "desc").get();
    // console.log('User data', doctorSnapshot.docs);
    return doctorSnapshot.docs.map((doctor) => {
        const name = doctor.data().firstName.concat(doctor.data().lastName);
        console.log(name);
        return doctor.data();
    })
}

export const getDoctor1 = async (doctorRefId) => {
    console.log('Get Doctor data', doctorRefId);
    const doctorSnapshot = await doctorRef.doc(doctorRefId).get();
    console.log('User data', doctorSnapshot.docs);
    return doctorSnapshot.map((doctor) => {
        console.log(doctor.data());
        return doctor.data();
    })
}

export const getDoctor = async (doctorRefId, navigate) => {
    console.log('Get Doctor data', doctorRefId);
    const snapshot = await doctorRef.where("id", "==", doctorRefId).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log('doctor data ', doc.id, " => ", doc.data());
            navigate(doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

export const addDoctor = (doctor) => {
  // const addDoctor = await firestore().collection('doctors').put(doctor);
  console.log('Put Doctors data ', doctor);
  const timestamp = new Date().getTime().toString();
  doctorRef.doc(timestamp).set({
    type: 1,
    firstName: doctor.firstName,
    lastName: doctor.lastName,
    name: doctor.firstName.concat(' ', doctor.lastName),
    phoneNumber: doctor.phoneNumber,
    email: doctor.email,
    id: timestamp
  })
}

export const claimDoctorProfile = (doctor, userId) => {
  console.log('Claim Doctors Profile ', doctor);
  doctorRef.doc(doctor.id).set({
    id: userId
  })
}

export const getDoctorImage = (doctorRefId) => {
  const storage = storage();
      storage
        .ref(`doctors/${doctorRefId}/images/profileImage`)
        .getDownloadURL()
        .then( url => {
          console.log( "Got Doctor Image download url: ", url );
          return url;
        });
}

export const getLogoImage = (doctorRefId) => {
  const storage = storage();
      storage
        .ref(`doctors/${doctorRefId}/images/logoImage`)
        .getDownloadURL()
        .then( url => {
          console.log( "Got Logo download url: ", url );
          return url;
        });
}

export const addImageURLToDoctor = (doctorRefId, url) => {
  console.log("addImageURLToDoctor");
  doctorRef.doc(doctorRefId).set({
    imageURL: url
  })
}

export const addLogoURLToDoctor = (doctorRefId, url) => {
  console.log("addLogoURLToDoctor");
  doctorRef.doc(doctorRefId).set({
    logoURL: url
  })
}

export const uploadDoctorImage = (doctor, imageUri) => {
    // const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${doctor.doctorName}`; // Generate unique name
    // this.setState({ uploading: true });
    const uploadTask = firebase.storage().ref(`doctors/${doctor.id}/images/${filename}`)

    uploadTask.putFile(imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            addImageToDoctor(doctor.doctorId);
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                addImageURLToDoctor(doctor.id, downloadURL)
              });
          }
        },
        error => {
          unsubscribe();
          alert('Upload failed, please try again.');
        }
      );
  };

  export const uploadLogoImage = (doctor, imageUri) => {
      // const ext = this.state.imageUri.split('.').pop(); // Extract image extension
      const filename = `${uuid()}.${doctor.doctorName}-LOGO`; // Generate unique name
      // this.setState({ uploading: true });
      const uploadTask = firebase.storage().ref(`doctors/${doctor.id}/images/${filename}`)

      uploadTask.putFile(imageUri)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            let state = {};
            state = {
              ...state,
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
            };
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              addImageToDoctor(doctor.doctorId);
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  console.log('File available at', downloadURL);
                  addLogoURLToDoctor(doctor.id, downloadURL)
                });
            }
          },
          error => {
            unsubscribe();
            alert('Upload failed, please try again.');
          }
        );
    };

    export const uploadDocument = (doctor, imageUri) => {
        // const ext = this.state.imageUri.split('.').pop(); // Extract image extension
        const filename = `${doctor.doctorName}.${uuid()}`; // Generate unique name
        // this.setState({ uploading: true });
        const uploadTask = firebase.storage().ref(`doctors/${doctor.id}/documents/${filename}`)

        uploadTask.putFile(imageUri)
          .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              let state = {};
              state = {
                ...state,
                progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
              };
              if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                addImageToDoctor(doctor.doctorId);
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                  });
              }
            },
            error => {
              unsubscribe();
              alert('Upload failed, please try again.');
            }
          );
      };
