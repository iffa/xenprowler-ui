import { IconButton } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { AddIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Spacer } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";

interface AddSearchQueryFormProps {
  searchQueries: string[];
  querySubmitted: (searchQuery: string) => Promise<boolean>;
}

export function AddSearchQueryForm(props: AddSearchQueryFormProps) {
  const { searchQueries, querySubmitted } = props;

  function validateSearchQueryInput(value: string) {
    let error;
    if (!value) {
      error = "Search query must not be empty";
    } else if (value.length < 4) {
      error = "Search query must be at least 3 characters long";
    } else if (searchQueries.some((x) => x === value)) {
      error = "Search query must be unique";
    }
    return error;
  }

  return (
    <Box width="full">
      <Formik
        initialValues={{ searchQuery: "" }}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          querySubmitted(values.searchQuery);
        }}
      >
        {(props) => (
          <Form>
            <Field name="searchQuery" validate={validateSearchQueryInput}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.searchQuery && form.touched.searchQuery
                  }
                >
                  <FormLabel htmlFor="searchQuery">New search query</FormLabel>
                  <Flex direction="row" align="center">
                    <InputGroup size="lg">
                      <Input {...field} id="searchQuery" placeholder="" />
                      <InputRightElement>
                        <IconButton
                          title="Add search query"
                          aria-label="Add search query"
                          icon={<AddIcon />}
                          colorScheme="blue"
                          isLoading={props.isSubmitting}
                          type="submit"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </Flex>
                  <FormErrorMessage>{form.errors.searchQuery}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Spacer />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
