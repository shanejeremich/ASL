const RESPONSE_MESSAGES = {
  // API success message
  REQUEST_DETAILS: req => `${req.method} - ${req.hostname} - ${req.originalUrl}`,

  // API failed message
  REQUEST_DETAILS_FAIL: (req, err) => `Error on request ${req.method} ${req.url} ${err.message}`,

  // 200 status codes
  RECORD_CREATED_SUCCESSFULLY: req => `${req.method} - Record created successfully`,
  RECORD_UPDATED_SUCCESSFULLY: (req, id) =>
    `${req.method} - Record with id: ${id} successfully updated`,
  RECORD_DELETED_SUCCESSFULLY: id => `Record with id: ${id} deleted successfully`,

  // 400 status codes
  PROVIDE_DETAILS: "Missing Information:  Please provide details",
  PROVIDE_DETAILS_TO_UPDATE: "Please provide details to update",

  // 404 status codes
  NO_RECORDS_FOUND: "No records found",
  RECORD_NOT_FOUND: id => `Record with id: ${id} not found`,
  NEW_ERROR: req => `404 - Not Found ${req.originalUrl}`,

  // 422 status codes
  VALIDATION_FAILED: "Validation failed",
  INVALID_ID_FORMAT: "Invalid ID format",

  // 500 status codes
  INTERNAL_SERVER_ERROR: err => `Internal Server Error: ${err.message}`,
  ERROR_SAVING_RECORD: reason => `Error saving record: ${reason}`,
  FAILED_TO_UPDATE_RECORD: "Failed to update record",
};

module.exports = RESPONSE_MESSAGES;
