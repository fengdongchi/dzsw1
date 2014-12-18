package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class UnitInfoselectAction extends ActionSupport{
    private int page;
    private int limit;
    private int rows;
    private List<TMeUnitInfo> unitlist;
    private String unitid;
    @Resource
    private BaseDAO<TMeUnitInfo> dao;

    public String select(){
        if(null!=unitid){
            unitlist = dao.queryForPage("from TMeUnitInfo u where u.unitid like\'%" + unitid + "%\'", page, limit);
            rows = unitlist.size();
            return SUCCESS;
        }
        unitlist=dao.queryForPage("from TMeUnitInfo",page,limit);
        rows=dao.queryRecordCount("select count(*) from TMeUnitInfo");
        return SUCCESS;
    }

    public String getUnitid() {
        return unitid;
    }

    public void setUnitid(String unitid) {
        this.unitid = unitid;
    }

    public List<TMeUnitInfo> getUnitlist() {
        return unitlist;
    }

    public void setUnitlist(List<TMeUnitInfo> unitlist) {
        this.unitlist = unitlist;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }
}
