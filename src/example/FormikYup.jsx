import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {Button, Input} from '@ui-kitten/components';
import * as Yup from 'yup';
import {Toggle} from '@ui-kitten/components';

const FormikYup = () => {
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Required Field'),
    surname: Yup.string().required('Required Field'),
    email: Yup.string()
      .required('Required Field')
      .email('Please enter a valid email address'),
    phone: Yup.string()
      .required('Required Field')
      .min(11, 'Please enter your phone number of at least 11 digits')
      .max(13, 'Please enter your phone number of at least 13 digits'),

    password: Yup.string()
      .required('Required Field')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    passwordConfirm: Yup.string()
      .required('Required Field')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    agrementConfirm: Yup.bool()
      .required('Required Field')
      .oneOf([true], 'You must agree to the terms and conditions'),
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#00e096',
            minHeight: 125,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
            REGISTER
          </Text>
        </View>

        <View style={{flex: 1, padding: 10}}>
          <ScrollView>
            {/* Your Form Fields Here */}
            <Formik
              initialValues={{
                email: '',
                name: '',
                surname: '',
                phone: '',
                password: '',
                passwordConfirm: '',
                agrementConfirm: false,
              }}
              validationSchema={registerSchema}
              // onSubmit={values => console.log(values)}>
              onSubmit={
                values =>
                  Alert.alert('Submitted Form', JSON.stringify(values, 0, 2)) //null veya 0 = baslangicta oldugu gibi / 2 = basindan 2 birim bosluk birak anlaminda alertin icindekulerin daha duzenli gozukmesini sagliyor
              }>
              {({
                handleChange,
                handleSubmit,
                values,
                setFieldValue,
                errors,
              }) => (
                <View>
                  <Input
                    label="Name"
                    size="large"
                    placeholder="Enter your name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    error={errors.name}
                    style={{marginVertical: 10}}
                    status={errors.name ? 'danger' : 'success'}
                    caption={errors.name}
                    editable={false}
                  />
                  <Input
                    label="Surname"
                    size="large"
                    placeholder="Enter your surname"
                    value={values.surname}
                    onChangeText={handleChange('surname')}
                    error={errors.surname}
                    style={{marginVertical: 10}}
                    status={errors.surname ? 'danger' : 'success'}
                    caption={errors.surname}
                    editable={false} // Klavyenin açılmasını engellemek için
                  />
                  <Input
                    label="E-mail"
                    size="large"
                    placeholder="Enter email address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    error={errors.email}
                    style={{marginVertical: 10}}
                    status={errors.email ? 'danger' : 'success'}
                    caption={errors.email}
                  />
                  <Input
                    label="Phone"
                    size="large"
                    placeholder="Enter your phone number"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    error={errors.phone}
                    style={{marginVertical: 10}}
                    status={errors.phone ? 'danger' : 'success'}
                    caption={errors.phone}
                  />
                  <Input
                    label="Password"
                    size="large"
                    placeholder="Enter your password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    error={errors.password}
                    style={{marginVertical: 10}}
                    status={errors.password ? 'danger' : 'success'}
                    caption={errors.password}
                    secureTextEntry={true}
                  />
                  <Input
                    label="Password Confirmation"
                    size="large"
                    placeholder="Enter your password again"
                    value={values.passwordConfirm}
                    onChangeText={handleChange('passwordConfirm')}
                    error={errors.passwordConfirm}
                    style={{marginVertical: 10}}
                    status={errors.passwordConfirm ? 'danger' : 'success'}
                    caption={errors.passwordConfirm}
                    secureTextEntry={true}
                  />

                  <View>
                    <Toggle
                      label="Dark Mode"
                      checked={values.agrementConfirm}
                      onChange={value =>
                        setFieldValue('agrementConfirm', value)
                      }>
                      <Text>
                        I accept the user agreement and privacy policy.
                      </Text>
                    </Toggle>
                    {errors.agrementConfirm && (
                      <Text style={{color: 'red'}}>
                        {errors.agrementConfirm}
                      </Text>
                    )}
                  </View>

                  <Button
                    style={{marginTop: 30}}
                    onPress={handleSubmit}
                    status="success">
                    Save
                  </Button>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
