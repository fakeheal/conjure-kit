import { useQuery, } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const endpoint = "https://backend.conjure.so/graphql";

export default function useTimeEntry(measureId, startDate, endDate, conjureToken) {
  return useQuery([measureId, startDate, endDate, conjureToken], async () => {
    const { dataSet: { records } } = await request(
      endpoint,
      gql`
          query dataSet($root: DataSetRootAttributes!) {
              dataSet(root: $root) {
                  success
                  errors {
                      messages {
                          attribute
                          messages
                          __typename
                      }
                      fullMessages
                      __typename
                  }
                  mode
                  records {
                      ...MeasurementFields
                      __typename
                  }
                  record {
                      ...MeasurementFields
                      __typename
                  }
                  pagination {
                      currentPage
                      limitValue
                      totalCount
                      totalPages
                      __typename
                  }
                  __typename
              }
          }
          fragment MeasurementFields on Measurement {
              measure {
                  fields {
                      id
                      name
                  }
              }
              id
              measureId
              measureType
              comment
              timestamp
              timestampRelative
              timestampOffset
              values
              meta {
                  key
                  value
                  __typename
              }
              createdAt
              updatedAt
              __typename
          }
      `,
      {
        'root': {
          "resource": "Measurement",
          "mode": "multiple-records",
          "sort_field": "timestamp",
          "sort_direction": "desc",
          "combinator": "and",
          "groupings": [
            {
              "combinator": "and",
              "conditions": [
                {
                  "field": "measure_id",
                  "field_type": "id",
                  "operator": "eq",
                  "value": measureId
                },
                {
                  "field": "timestamp",
                  "field_type": "datetime",
                  "operator": "gteq",
                  "value": startDate
                },
                {
                  "field": "timestamp",
                  "field_type": "datetime",
                  "operator": "lt",
                  "value": endDate
                }
              ]
            }
          ]
        }
      },
      {
        authorization: 'Bearer ' + conjureToken
      }
    );
    return records;
  });
}
