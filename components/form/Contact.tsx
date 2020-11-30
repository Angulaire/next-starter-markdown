import { Box, Grid, Flex, HStack, Button, FormControl, FormLabel, FormErrorMessage, Input, Textarea, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import Select from 'components/common/Select';
import { useForm, Controller }from 'react-hook-form';
import { useTranslation } from 'lib/hooks/useTranslation';
import React, { useState } from 'react';

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
      alert(msg)
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: msg }
      })
    }
  }

  const { register, errors, handleSubmit, control } = useForm();

  const onSubmit = async data => {
    const res = await fetch('/api/demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const text = await res.text()
    handleResponse(res.status, text)
  };

  return (
    <>
      {!status.submitted ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack spacing="24px">
            <FormControl isInvalid={errors.firstName}>
              <FormLabel htmlFor="firstName">
                {t.form.input['firstName']}
              </FormLabel>
              <Input
                name="firstName"
                type="text"
                placeholder="John"
                ref={register({ required: true, maxLength: 80 })}
              />
              <FormErrorMessage>
                {errors.firstName && `${t.form.error['required']} ${t.form.input['firstName'].toLowerCase()}`}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastName}>
              <FormLabel htmlFor="lastName">
                {t.form.input['lastName']}
              </FormLabel>
              <Input
                name="lastName"
                type="text"
                placeholder="Doe"
                ref={register({ required: true, maxLength: 80 })}
              />
              <FormErrorMessage>
                {errors.lastName && `${t.form.error['required']} ${t.form.input['lastName'].toLowerCase()}`}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">
              {t.form.input['email']}
            </FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="john@acme.com"
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.type === "required" && `${t.form.error['required']} ${t.form.input['email'].toLowerCase()}`}
              {errors.email && errors.email.type === "pattern" && t.form.error['valid'].replace("{{input}}", t.form.input['email'].toLowerCase())}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.employeesNumber}>
            <FormLabel htmlFor="employeesNumber">
              {t.form.input['employeesNumber']}
            </FormLabel>
            <Controller
              name="employeesNumber"
              as={Select}
              options={[
                { value: '1', label: 'Solopreneur' },
                { value: '1-10', label: '1-10' },
                { value: '10-100', label: '10-100' },
                { value: '100-1000', label: '100-1000' },
                { value: 'More than 1000', label: '1000+' }
              ]}
              control={control}
              rules={{ required: true }}
              isSearchable={false}
            />
            <FormErrorMessage>
              {errors.employeesNumber && `${t.form.error['required']} ${t.form.input['employeesNumber'].toLowerCase()}`}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.phone}>
            <FormLabel htmlFor="phone">
              {t.form.input['phone']}
            </FormLabel>
            <Input
              name="phone"
              type="phone"
              placeholder="+1 (123) 456-7890"
              ref={register({
                required: true,
                validate: {
                  validNumber: value => value.length > 3 && value.length < 15,
                },
              })}
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.type === 'validNumber' && t.form.error['valid'].replace("{{input}}", t.form.input['phone'].toLowerCase())}
              {errors.phone && errors.phone.type === 'required' && `${t.form.error['required']} ${t.form.input['phone'].toLowerCase()}`}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.organization}>
            <FormLabel htmlFor="organization">
              {t.form.input['organization']}
            </FormLabel>
            <Input
              name="organization"
              type="text"
              placeholder="Acme"
              ref={register({ required: true })}
            />
            <FormErrorMessage>
              {errors.organization && `${t.form.error['required']} ${t.form.input['organization'].toLowerCase()}`}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.message}>
            <FormLabel htmlFor="message">
              {t.form.input['message']}
            </FormLabel>
            <Textarea
              name="message"
              rows={4} 
              ref={register({ required: true  })}
            />
            <FormErrorMessage>
              {errors.message && `${t.form.error['required']} ${t.form.input['message'].toLowerCase()}`}
            </FormErrorMessage>
          </FormControl>
          <Box mt="5">
            <Button onClick={handleSubmit(onSubmit)} width="100%">
              {!status.submitting
                ? !status.submitted
                  ? t.form.submit['demo']
                  : t.form.status['submitted']
                : t.form.status['submitting']}
            </Button>
          </Box>
        </form>
      ) : (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {t.form.alert.success["title"]}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {t.form.alert.success["description"]}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};