import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormContext, AppContext } from '../context';
import { emailValidator } from './helpers';
import styles from './StoryForm.module.css';

function FormDialog() {

  const [ open, setOpen ] = useState(false);
  const [ content, setContent ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ authorError, setAuthorError ] = useState(false);
  const [ contentError, setContentError ] = useState(false);
  const isValid = prop => {
    switch(prop) {
      case 'author':
        const authr = author.trim('');
        if(authr === '' || authr.split('').length < 1) {
          setAuthorError(true);
          return true;
        }
        break;
      case 'content':
        if(content.length < 2) {
          setContentError(true);
          return true;
        }
        break;
      default:
        return;
    }
  }
  const handleSubmit = (openForm, makePost) => {
    const formValid = [
      isValid('author'),
      isValid('content')
    ]
    if(formValid.includes(true)) {
      return;
    }
    else {
      makePost({ author, content, likes: 0, date: Date.now() })
      openForm();
    }
  }

return (
    <AppContext.Consumer>
      {
        ({ formOpen, openForm, makePost }) => (
          <FormContext.Provider value={{
            open: open,
            openForm: open,
            submit: handleSubmit,
          }}>
            <div>
              <Dialog
                open={ formOpen }
                onClose={ openForm }
                aria-labelledby="form-dialog-title"
                fullScreen={true}
              >
                <DialogTitle id="form-dialog-title">chirp</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Complete the form so the world can hear your voice!
                  </DialogContentText>
                  <div>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      name="author"
                      label="Name"
                      type="text"
                      error={ authorError }
                      onChange={ e => {
                        e.preventDefault()
                        if(authorError === true) {
                          setAuthorError(false);
                        }
                        setAuthor(e.target.value)
                      } }
                    />
                    <FormHelperText
                      style={{display:`${authorError ? 'block' : 'none'}`}}
                      className={ styles['component-error-text'] }>*You must enter a valid name
                    </FormHelperText>
                  </div>



                  <div>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="story"
                      name="content"
                      label="Story"
                      type="text"
                      fullWidth
                      multiline={true}
                      error={ contentError }
                      onChange={ e => {
                        e.preventDefault();
                        if(contentError === true) {
                          setContentError(false);
                        }
                        setContent(e.target.value) 
                      } }
                    />
                    <FormHelperText
                      style={{display:`${contentError ? 'block' : 'none'}`}}
                      className={ styles['component-error-text'] }>*Your chirp must be at least 2 characters
                    </FormHelperText>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={ () => openForm() } color="primary">
                    Discard
                  </Button>
                  <Button onClick={ () => { handleSubmit(openForm, makePost) } } color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </FormContext.Provider>
        )
      }
    </AppContext.Consumer>
  );
}

export default FormDialog;