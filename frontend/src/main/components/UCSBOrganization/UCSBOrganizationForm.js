import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UCSBOrganizationForm({
  initialContents,
  submitAction,
  buttonLabel = "Create",
}) {
  // Stryker disable all
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialContents || {} });
  // Stryker restore all

  const navigate = useNavigate();

  const testIdPrefix = "UCSBOrganizationForm";

  return (
    <Form onSubmit={handleSubmit(submitAction)}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="orgCode">OrgCode</Form.Label>
        <Form.Control
          data-testid={testIdPrefix + "-orgCode"}
          id="orgCode"
          type="text"
          isInvalid={Boolean(errors.orgField)}
          {...register("orgCode", {
            required: "orgCode is required",
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.orgCode?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* {initialContents && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="orgCode">OrgCode</Form.Label>
          <Form.Control
            data-testid={testIdPrefix + "-orgCode"}
            id="orgCode"
            type="text"
            {...register("orgCode")}
            value={initialContents.orgCode}
            disabled
          />
        </Form.Group>
      )}

      {!initialContents && (
        <Form.Group className="mb-3">
        <Form.Label htmlFor="orgCode">OrgCode</Form.Label>
        <Form.Control
          data-testid={testIdPrefix + "-orgCode"}
          id="orgCode"
          type="text"
          isInvalid={Boolean(errors.orgCode)}
          {...register("orgCode", {
            required: "orgCode is required.",
            maxLength: {
              value: 3,
              message: "Max length 3 characters",
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.orgCode?.message}
        </Form.Control.Feedback>
      </Form.Group>)} */}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="orgTranslationShort">
          OrgTranslationShort
        </Form.Label>
        <Form.Control
          data-testid={testIdPrefix + "-orgTranslationShort"}
          id="orgTranslationShort"
          type="text"
          isInvalid={Boolean(errors.orgTranslationShort)}
          {...register("orgTranslationShort", {
            required: "orgTranslationShort is required.",
            maxLength: {
              value: 30,
              message: "Max length 30 characters",
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.orgTranslationShort?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="orgTranslation">OrgTranslation</Form.Label>
        <Form.Control
          data-testid={testIdPrefix + "-orgTranslation"}
          id="orgTranslation"
          type="text"
          isInvalid={Boolean(errors.orgTranslation)}
          {...register("orgTranslation", {
            required: "orgTranslation is required.",
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.orgTranslation?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="inactive">Inactive</Form.Label>
        <Form.Control
          data-testid={testIdPrefix + "-inactive"}
          id="inactive"
          as="select"
          isInvalid={Boolean(errors.inactive)}
          {...register("inactive")}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </Form.Control>
        <Form.Control.Feedback type="inactive">
          {errors.inactive?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" data-testid={testIdPrefix + "-submit"}>
        {buttonLabel}
      </Button>
      <Button
        variant="Secondary"
        onClick={() => navigate(-1)}
        data-testid={testIdPrefix + "-cancel"}
      >
        Cancel
      </Button>
    </Form>
  );
}

export default UCSBOrganizationForm;
