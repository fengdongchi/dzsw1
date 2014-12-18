package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfo;
import com.shinowit.entity.TBaMemberInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
public class MemberInfoselectAction extends ActionSupport {
    private int page;
    private int limit;
    private int rows;
    private List<TBaMemberInfo> memberlist;
    private String userName;
    @Resource
    public BaseDAO<TBaMemberInfo> dao;

    public String select(){

        if(userName!=null){
            memberlist=dao.queryForPage("from TBaMemberInfo a where a.userName like \'%" + userName + "%\'", page, limit);
            rows=memberlist.size();
            return SUCCESS;
        }
        memberlist=dao.queryForPage("from TBaMemberInfo",page,limit);
        rows=dao.queryRecordCount("select count(*) from TBaMemberInfo");
        return SUCCESS;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public List<TBaMemberInfo> getMemberlist() {
        return memberlist;
    }

    public void setMemberlist(List<TBaMemberInfo> memberlist) {
        this.memberlist = memberlist;
    }
}
