<?php

    $form_error = "";

    /* Form variables
    ========================================================================== */
    $form_bmi_weight = $_POST["form_bmi_weight"];
    $form_bmi_height = $_POST["form_bmi_height"];

    /* ==========================================================================
    Calculation
    ========================================================================== */
    $finalBmi = $form_bmi_weight / ($form_bmi_height / 100 * $form_bmi_height / 100);

    if ($finalBmi < 15 ) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Very severely underweight.</div>';
    } elseif ($finalBmi < 16) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are severely underweight.</div>';
    } elseif ($finalBmi < 18.5) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are underweight.</div>';
    } elseif ($finalBmi < 25) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Normal (healthy weight).</div>';
    } elseif ($finalBmi < 30) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are overweight.</div>';
    } elseif ($finalBmi < 35) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Obese Class I (Moderately obese).</div>';
    } elseif ($finalBmi < 40) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Obese Class II (Severely obese).</div>';
    } elseif ($finalBmi >= 40) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Obese Class III (Very severely obese).</div>';
    }

?>