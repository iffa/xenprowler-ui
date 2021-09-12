import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { validate } from "email-validator";
import { Field, Form, Formik } from "formik";
import useAuth from "../AuthContext";

export default function RequestLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { requestAuthToken } = useAuth();

  function validateEmail(value?: string) {
    if (!value) {
      return "Email is required";
    } else if (!validate(value)) {
      return "Enter a valid email";
    }
  }

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, actions) => {
          const { email } = values;

          return requestAuthToken(email).then(() => {
            actions.setSubmitting(false);
            onOpen();
          });
        }}
      >
        {(props) => (
          <Form>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    placeholder="gaben@valvesoftware.com"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  <FormHelperText>
                    We'll send a login link to your inbox. We won't spam you,
                    promise.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Send login link
            </Button>
          </Form>
        )}
      </Formik>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Check your email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              We have sent you an email with a link to login. If you don't see
              the email in your inbox, please check your spam folder.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
