import React, { useEffect } from 'react'
import { useStore } from '../StorePage';
import { API_BASE_URL } from '../../../../config';
import { Alert, Snackbar } from '@mui/material';
import { GoMail } from 'react-icons/go';
function Contact_Us() {
  const [open,setOpen]=React.useState(false)
  const { store,filters,setFilters  } = useStore();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const[formData,setFormData]=React.useState({
    name:'',
    email:'',
    subject:'',
    message:'',
    store_email:store.email,
  })
  const Validateur=()=>{
    let nameError = "";
    let emailError = "";
    let messageError = "";
    let subjectError = "";
    if (!formData.name) {
      nameError = "Name is required";
    }
    if (!formData.email) {
      emailError = "Email is required";
    }
    if (!formData.message) {
      messageError = "Message is required";
    }
    if (formData.subject==='') {
      subjectError = "Subject is required";
    }
    if (emailError || nameError || messageError) {
      setFormData({ 
        ...formData,
        emailError, nameError, messageError });
      return false;
    }
    return true;
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const isValid = Validateur();
    if (isValid) {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
      };
      const response = await fetch(`${API_BASE_URL}/stores/contactUs`, requestOptions)
      const data = await response.json();
      if(data.success){
       setOpen(true)
        setFormData({
          name:'',
          email:'',
          subject:'',
          message:'',
          store_email:store?.email,
        })
      }
      else{
        throw new Error('An error occured, please try again later')
      }
    } catch (error) {
      setFormData({ ...formData, error:'An error occured, please try again later'})
      
    }
      
    }
  }
  return (
    <>
        {open&& <Snackbar
                open={true}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={2000}
                onClose={() => setOpen('')}
            >
                 <Alert
                    onClose={() => setOpen('')}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                 {`email sent successfully`} 
                </Alert>
         </Snackbar>}
   
    <section style={{background:'white'}} className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <div className="wrapper">
              <div className="row no-gutters">
                <div className="col-md-7 d-flex align-items-stretch">
                  <div className="contact-wrap w-100 p-md-5 p-4">
                    <h3 className="mb-4">Get in touch</h3>
                    <div id="form-message-warning" className="mb-4" />
                    <div id="form-message-success" className="mb-4">
                      Your message was sent, thank you!
                      {formData.error && <div style={{color:'red'}}>{formData.error}</div>}
                    </div>
                    <form  id="contactForm" name="contactForm">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={(e)=>setFormData({...formData,name:e.target.value})}
                              style={{borderColor: formData.nameError && 'red'} }
                              id="name"
                              placeholder="Name"
                            />
                             {formData.nameError && <div style={{color:'red'}}>{formData.nameError}</div>}
                        
                          </div>
                         </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              style={{borderColor: formData.emailError && 'red'} }
                              value={formData.email}
                              onChange={(e)=>setFormData({...formData,email:e.target.value})}
                              placeholder="Email"
                            />
                            {formData.emailError && <div style={{color:'red'}}>{formData.emailError}</div>}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <select
                              value={formData.subject}
                              onChange={(e)=>setFormData({...formData,subject:e.target.value})}
                              className="form-control"
                              style={{borderColor: formData.subjectError && 'red'} }
                              name="subject"
                              id="subject"
                              placeholder="Subject"
                            >
                              <option value={''}>Subject</option>
                              <option value={'Customer Services'}>Customer Services</option>
                              <option value={'Technical Support'}>Technical Support</option>
                              <option value={'General Information'}>General Information</option>
                              <option value={'Others'}>Others</option>
                            </select>
                            {formData.subjectError && <div style={{color:'red'}}>{formData.subjectError}</div>}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              name="message"
                              className="form-control"
                              id="message"
                              value={formData.message}
                              onChange={(e)=>setFormData({...formData,message:e.target.value})}
                              error={formData.messageError}
                              cols={30}
                              style={{borderColor: formData.messageError && 'red'} }
                              rows={7}
                              placeholder="Message"
                              defaultValue={""}
                            />
                            {formData.messageError && <div style={{color:'red'}}>{formData.messageError}</div>}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="submit"
                              onClick={handleSubmit}
                              defaultValue="Send Message"
                              className="btn btn-primary"
                            />
                            <div className="submitting" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-stretch">
                  <div style={{background:'rgb(35, 47, 62)',color:'white'}} className="info-wrap m-4 w-100 p-lg-5 p-4">
                    <h3 className="mb-4 mt-md-4">Contact us</h3>
                    <div className="dbox w-120 d-flex align-items-start">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker" />
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Address:</span> {store?.address}
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-120 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone" />
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Phone:</span>
                          <p href="tel://1234567920">{store?.phone}</p>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-120 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane" />
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Email:</span>{" "}
                          <p href="mailto:info@yoursite.com">{store?.email}</p>
                        </p>
                      </div>
                    </div>
                    <div className="dbox w-120 d-flex align-items-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe" />
                      </div>
                      <div className="text pl-3">
                        <p>
                          <span>Website</span> <p href="#">{store?.site_web}</p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {
      store?.longitude
      &&
      store?.latitude
      &&
      <iframe
      src={`https://maps.google.com/maps?q=${store?.latitude},${store?.longitude}&z=15&output=embed`}
      width="100%"
      height={450}
      frameBorder={0}
      style={{border: 0}}
      allowFullScreen
      aria-hidden="false"
      tabIndex={0}
    />
    }
  </>
  
  )
}

export default Contact_Us