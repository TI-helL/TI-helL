# Swagger

## Swagger v3 Annotations

|                     v2                      |                                v3                                 |
| :-----------------------------------------: | :---------------------------------------------------------------: |
|                    @Api                     |                               @Tag                                |
|                 @ApiIgnore                  | @Parameter(hidden = true) or @Operation(hidden = true) or @Hidden |
|              @ApiImplicitParam              |                            @Parameter                             |
|             @ApiImplicitParams              |                            @Parameters                            |
|                  @ApiModel                  |                              @Schema                              |
|      @ApiModelProperty(hidden = true)       |                  @Schema(accessMode = READ_ONLY)                  |
|              @ApiModelProperty              |                              @Schema                              |
| @ApiOperation(value = "foo", notes = "bar") |         @Operation(summary = "foo", description = "bar")          |
|                  @ApiParam                  |                            @Parameter                             |
|  @ApiResponse(code = 404, message = "foo")  |      @ApiResponse(responseCode = "404", description = "foo")      |
